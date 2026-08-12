import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { accessSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const toolkitRoot = path.join(root, 'atelierOS');
const configPath = path.join(root, 'designkernel.config.json');
const force = process.argv.includes('--force');
const noSync = process.argv.includes('--no-sync');

function exists(filePath) {
  try {
    accessSync(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function resolveInsideRoot(relativePath) {
  const resolved = path.resolve(root, relativePath);
  const relation = path.relative(root, resolved);
  if (relation.startsWith('..') || path.isAbsolute(relation)) {
    throw new Error(`Configured path escapes the repository: ${relativePath}`);
  }
  return resolved;
}

async function engineInstalled(enginePath, entrypoint) {
  if (!exists(enginePath)) return false;
  if (entrypoint) return exists(path.join(enginePath, entrypoint));
  const entries = await readdir(enginePath);
  return entries.some((entry) => entry !== '.gitkeep');
}

const config = JSON.parse(await readFile(configPath, 'utf8'));
const projectRoot = resolveInsideRoot(config.projectRoot);

const templateFiles = [
  ['templates/PRODUCT.template.md', 'PRODUCT.md'],
  ['templates/DESIGN.template.md', 'DESIGN.md'],
  ['templates/BRIEF.template.md', '.design/BRIEF.md'],
  ['templates/REFERENCES.template.md', '.design/REFERENCES.md'],
  ['templates/DECISIONS.template.md', '.design/DECISIONS.md'],
];

const directories = [
  '.design/audits',
  '.design/screenshots',
  '.agents/skills',
  'src',
  'public',
];

const agentDirectories = {
  codex: '.codex',
  cursor: '.cursor',
  claude: '.claude',
  copilot: '.github/instructions',
};

console.log(`DesignKernel setup${force ? ' (overwrite enabled)' : ''}`);

await mkdir(projectRoot, { recursive: true });

for (const directory of directories) {
  await mkdir(path.join(projectRoot, directory), { recursive: true });
}

for (const [agent, enabled] of Object.entries(config.agents ?? {})) {
  if (enabled && agentDirectories[agent]) {
    await mkdir(path.join(projectRoot, agentDirectories[agent]), { recursive: true });
  }
}

for (const [templateRelative, destinationRelative] of templateFiles) {
  const source = path.join(toolkitRoot, templateRelative);
  const destination = path.join(projectRoot, destinationRelative);
  await mkdir(path.dirname(destination), { recursive: true });
  const destinationExists = exists(destination);

  if (destinationExists && !force) {
    console.log(`SKIP ${path.relative(root, destination)} (already exists)`);
    continue;
  }

  await copyFile(source, destination);
  console.log(`${destinationExists ? 'WRITE' : 'CREATE'} ${path.relative(root, destination)}`);
}

const changelogPath = path.join(projectRoot, '.design/CHANGELOG.md');
if (!exists(changelogPath) || force) {
  await writeFile(
    changelogPath,
    '# Design Changelog\n\n## Unreleased\n\n- Initialized DesignKernel project design memory.\n',
    'utf8',
  );
  console.log(`WRITE ${path.relative(root, changelogPath)}`);
} else {
  console.log(`SKIP ${path.relative(root, changelogPath)} (already exists)`);
}

for (const engine of Object.keys(config.engines ?? {})) {
  await mkdir(path.join(toolkitRoot, 'engines', engine), { recursive: true });
}

if (!noSync) {
  console.log('\nSyncing agent integrations...');
  const result = spawnSync(process.execPath, [path.join(toolkitRoot, 'scripts/sync.mjs')], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    console.error('Agent integration sync did not complete successfully.');
    process.exitCode = result.status ?? 1;
  }
}

const missingEngines = [];
for (const [engine, settings] of Object.entries(config.engines ?? {})) {
  if (
    settings.enabled &&
    !(await engineInstalled(path.join(toolkitRoot, 'engines', engine), settings.entrypoint))
  ) {
    missingEngines.push(engine);
  }
}

if (missingEngines.length > 0) {
  console.log('\nExternal engine installation required:');
  for (const engine of missingEngines) {
    console.log(
      `- ${engine}: install ${settings.repository ?? 'the official upstream'} in atelierOS/engines/${engine}.`,
    );
  }
  console.log('Keep all custom DesignKernel behavior outside atelierOS/engines/.');
}

console.log('\nSetup complete. Run: pnpm design:doctor');
