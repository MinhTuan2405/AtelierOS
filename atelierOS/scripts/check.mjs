import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const config = JSON.parse(
  await readFile(path.join(root, 'designkernel.config.json'), 'utf8'),
);
const projectRoot = path.resolve(root, config.projectRoot);
const projectPackagePath = path.join(projectRoot, 'package.json');

let projectPackage;
try {
  projectPackage = JSON.parse(await readFile(projectPackagePath, 'utf8'));
} catch (error) {
  console.error(`Cannot read ${path.relative(root, projectPackagePath)}: ${error.message}`);
  process.exit(1);
}

const scripts = projectPackage.scripts ?? {};
const configuredChecks = config.checks ?? {
  detector: ['design:detector', 'impeccable:detect'],
  lint: ['lint'],
  typecheck: ['typecheck'],
  accessibility: ['test:a11y', 'accessibility'],
  tests: ['test'],
};

const capabilities = [];
for (const [capability, candidates] of Object.entries(configuredChecks)) {
  const candidateList = Array.isArray(candidates) ? candidates : [candidates];
  const script = candidateList.find((name) => typeof scripts[name] === 'string');
  if (script) capabilities.push({ capability, script });
  else console.log(`SKIP ${capability}: no matching project script (${candidateList.join(', ')})`);
}

if (capabilities.length === 0) {
  console.log('\nNo frontend quality capabilities are currently exposed by src/package.json.');
  console.log('Add project scripts matching designkernel.config.json as tools become available.');
  process.exit(0);
}

const npmExecPath = process.env.npm_execpath;
const fallbackCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
let failures = 0;

console.log(`\nDetected ${capabilities.length} quality check(s).\n`);

for (const { capability, script } of capabilities) {
  console.log(`RUN ${capability}: pnpm --dir ${path.relative(root, projectRoot)} run ${script}`);
  const result = npmExecPath
    ? spawnSync(process.execPath, [npmExecPath, '--dir', projectRoot, 'run', script], {
        cwd: root,
        stdio: 'inherit',
      })
    : spawnSync(fallbackCommand, ['--dir', projectRoot, 'run', script], {
        cwd: root,
        stdio: 'inherit',
      });

  if (result.error || result.status !== 0) {
    console.error(`FAIL ${capability}`);
    failures += 1;
  } else {
    console.log(`PASS ${capability}\n`);
  }
}

if (failures > 0) {
  console.error(`Design checks failed: ${failures}`);
  process.exitCode = 1;
} else {
  console.log('Design checks passed.');
}
