import { lstat, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const healthy = '✓ healthy';
const warning = '⚠ warning';
const missing = '✗ missing/broken';
let warnings = 0;
let errors = 0;

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function reportHealthy(message) {
  console.log(`${healthy}: ${message}`);
}

function reportWarning(message) {
  warnings += 1;
  console.log(`${warning}: ${message}`);
}

function reportMissing(message) {
  errors += 1;
  console.log(`${missing}: ${message}`);
}

async function checkGroup(name, relativePaths) {
  const absent = [];
  for (const relativePath of relativePaths) {
    if (!(await pathExists(path.join(root, relativePath)))) absent.push(relativePath);
  }

  if (absent.length === 0) {
    reportHealthy(`${name} (${relativePaths.length} required paths)`);
  } else {
    for (const relativePath of absent) reportMissing(`${name}: ${relativePath}`);
  }
}

async function engineInstalled(enginePath, entrypoint) {
  if (!(await pathExists(enginePath))) return false;
  if (entrypoint) return pathExists(path.join(enginePath, entrypoint));
  const entries = await readdir(enginePath);
  return entries.some((entry) => entry !== '.gitkeep');
}

async function findBrokenSymlinks(directory, brokenLinks) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const entryPath = path.join(directory, entry.name);
    const info = await lstat(entryPath);
    if (info.isSymbolicLink()) {
      try {
        await stat(entryPath);
      } catch {
        brokenLinks.push(path.relative(root, entryPath));
      }
    } else if (info.isDirectory()) {
      await findBrokenSymlinks(entryPath, brokenLinks);
    }
  }
}

console.log('DesignKernel doctor\n');

let config;
try {
  config = JSON.parse(await readFile(path.join(root, 'designkernel.config.json'), 'utf8'));
  const valid =
    config.version === 1 &&
    typeof config.projectRoot === 'string' &&
    typeof config.defaultProfile === 'string' &&
    config.engines &&
    config.agents;
  if (valid) reportHealthy('designkernel.config.json');
  else reportMissing('designkernel.config.json does not contain required fields');
} catch (error) {
  reportMissing(`designkernel.config.json cannot be read: ${error.message}`);
}

await checkGroup('kernel', [
  'atelierOS/kernel/design-director/SKILL.md',
  'atelierOS/kernel/design-reviewer/SKILL.md',
  'atelierOS/kernel/constitution/DESIGN-CONSTITUTION.md',
  'atelierOS/kernel/constitution/PRIORITY.md',
]);

await checkGroup('rules', [
  'atelierOS/rules/anti-patterns.md',
  'atelierOS/rules/accessibility.md',
  'atelierOS/rules/responsive.md',
  'atelierOS/rules/code-quality.md',
]);

await checkGroup('profiles', [
  'atelierOS/profiles/landing-page.md',
  'atelierOS/profiles/saas-product.md',
  'atelierOS/profiles/dashboard.md',
  'atelierOS/profiles/ecommerce.md',
  'atelierOS/profiles/portfolio.md',
  'atelierOS/profiles/editorial.md',
]);

await checkGroup('workflows', [
  'atelierOS/workflows/discovery.md',
  'atelierOS/workflows/art-direction.md',
  'atelierOS/workflows/shape.md',
  'atelierOS/workflows/build.md',
  'atelierOS/workflows/redesign.md',
  'atelierOS/workflows/review.md',
  'atelierOS/workflows/ship.md',
]);

await checkGroup('templates', [
  'atelierOS/templates/PRODUCT.template.md',
  'atelierOS/templates/DESIGN.template.md',
  'atelierOS/templates/BRIEF.template.md',
  'atelierOS/templates/REFERENCES.template.md',
  'atelierOS/templates/DECISIONS.template.md',
]);

if (config) {
  const projectRoot = path.resolve(root, config.projectRoot);
  const relation = path.relative(root, projectRoot);
  if (relation.startsWith('..') || path.isAbsolute(relation)) {
    reportMissing(`projectRoot escapes repository: ${config.projectRoot}`);
  } else {
    await checkGroup('project design memory', [
      path.relative(root, path.join(projectRoot, 'PRODUCT.md')),
      path.relative(root, path.join(projectRoot, 'DESIGN.md')),
      path.relative(root, path.join(projectRoot, '.design/BRIEF.md')),
      path.relative(root, path.join(projectRoot, '.design/REFERENCES.md')),
      path.relative(root, path.join(projectRoot, '.design/DECISIONS.md')),
      path.relative(root, path.join(projectRoot, '.design/CHANGELOG.md')),
    ]);

    const defaultProfile = path.join(root, 'atelierOS', 'profiles', `${config.defaultProfile}.md`);
    if (await pathExists(defaultProfile)) reportHealthy(`default profile: ${config.defaultProfile}`);
    else reportMissing(`default profile does not exist: ${config.defaultProfile}`);

    const sharedSkills = [
      path.join(projectRoot, '.agents/skills/design-director/SKILL.md'),
      path.join(projectRoot, '.agents/skills/design-reviewer/SKILL.md'),
    ];
    for (const skillPath of sharedSkills) {
      if (!(await pathExists(skillPath))) {
        reportMissing(`agent skill not synchronized: ${path.relative(root, skillPath)}`);
      }
    }

    const integrations = {
      codex: '.codex/designkernel.md',
      cursor: '.cursor/rules/designkernel.mdc',
      claude: '.claude/commands/designkernel.md',
      copilot: '.github/instructions/designkernel.instructions.md',
    };
    for (const [agent, enabled] of Object.entries(config.agents ?? {})) {
      if (!enabled) continue;
      const integrationPath = integrations[agent];
      if (!integrationPath) {
        reportWarning(`no adapter check is defined for enabled agent: ${agent}`);
      } else if (await pathExists(path.join(projectRoot, integrationPath))) {
        reportHealthy(`${agent} adapter`);
      } else {
        reportMissing(`${agent} adapter: ${path.join(config.projectRoot, integrationPath)}`);
      }
    }
  }

  for (const [engine, settings] of Object.entries(config.engines ?? {})) {
    if (!settings.enabled) {
      reportHealthy(`${engine} engine disabled by configuration`);
    } else if (
      await engineInstalled(
        path.join(root, 'atelierOS', 'engines', engine),
        settings.entrypoint,
      )
    ) {
      reportHealthy(`${engine} engine available (${settings.entrypoint ?? 'entrypoint not configured'})`);
    } else {
      reportWarning(
        `${engine} engine is enabled but missing ${settings.entrypoint ?? `atelierOS/engines/${engine}`}`,
      );
    }
  }
}

const brokenLinks = [];
try {
  await findBrokenSymlinks(root, brokenLinks);
  if (brokenLinks.length === 0) reportHealthy('no broken symlinks');
  else for (const link of brokenLinks) reportMissing(`broken symlink: ${link}`);
} catch (error) {
  reportMissing(`symlink scan failed: ${error.message}`);
}

console.log(`\nChecks: ${errors} error(s), ${warnings} warning(s)`);
if (errors === 0 && warnings === 0) {
  console.log('DESIGNKERNEL STATUS: READY');
} else {
  console.log('DESIGNKERNEL STATUS: NEEDS ATTENTION');
}

if (errors > 0) process.exitCode = 1;
