import { spawnSync } from 'node:child_process';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const enginesRoot = path.join(root, 'atelierOS', 'engines');
const config = JSON.parse(
  await readFile(path.join(root, 'designkernel.config.json'), 'utf8'),
);

function git(enginePath, args, inherit = false) {
  return spawnSync('git', ['-C', enginePath, ...args], {
    encoding: 'utf8',
    stdio: inherit ? 'inherit' : 'pipe',
  });
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function engineInstalled(enginePath, entrypoint) {
  if (!(await exists(enginePath))) return false;
  if (entrypoint) return exists(path.join(enginePath, entrypoint));
  const entries = await readdir(enginePath);
  return entries.some((entry) => entry !== '.gitkeep');
}

function requestedEngine() {
  const equalsArgument = process.argv.find((argument) => argument.startsWith('--engine='));
  if (equalsArgument) return equalsArgument.slice('--engine='.length);
  const index = process.argv.indexOf('--engine');
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const selected = requestedEngine();
const configuredEngines = Object.entries(config.engines ?? {}).filter(
  ([name, settings]) => settings.enabled && (!selected || name === selected),
);

if (selected && configuredEngines.length === 0) {
  console.error(`Unknown or disabled engine: ${selected}`);
  process.exitCode = 1;
} else if (configuredEngines.length === 0) {
  console.log('No enabled engines are configured.');
} else {
  console.log('Engine updates are confined to atelierOS/engines/. Kernel and custom content are never touched.\n');
}

let failures = 0;

for (const [engine, settings] of configuredEngines) {
  const enginePath = path.resolve(enginesRoot, engine);
  const relation = path.relative(enginesRoot, enginePath);
  if (relation.startsWith('..') || path.isAbsolute(relation)) {
    console.error(`SKIP ${engine}: configured path escapes atelierOS/engines/`);
    failures += 1;
    continue;
  }

  if (!(await engineInstalled(enginePath, settings.entrypoint))) {
    console.warn(`SKIP ${engine}: not installed. Install the official upstream in atelierOS/engines/${engine}.`);
    continue;
  }

  if (!(await exists(path.join(enginePath, '.git')))) {
    console.warn(`SKIP ${engine}: upstream is not Git-managed; update it manually in place.`);
    continue;
  }

  const status = git(enginePath, ['status', '--porcelain']);
  if (status.status !== 0) {
    console.error(`FAIL ${engine}: could not inspect Git status.`);
    failures += 1;
    continue;
  }
  if (status.stdout.trim()) {
    console.warn(`SKIP ${engine}: upstream checkout has local changes.`);
    continue;
  }

  const upstream = git(enginePath, [
    'rev-parse',
    '--abbrev-ref',
    '--symbolic-full-name',
    '@{upstream}',
  ]);
  if (upstream.status !== 0) {
    console.warn(`SKIP ${engine}: current branch has no upstream tracking branch.`);
    continue;
  }

  console.log(`UPDATE ${engine}: fetching upstream...`);
  const fetch = git(enginePath, ['fetch', '--prune'], true);
  if (fetch.status !== 0) {
    console.error(`FAIL ${engine}: fetch failed.`);
    failures += 1;
    continue;
  }

  const merge = git(enginePath, ['merge', '--ff-only', upstream.stdout.trim()], true);
  if (merge.status !== 0) {
    console.error(`FAIL ${engine}: fast-forward update was not possible; no forced update attempted.`);
    failures += 1;
    continue;
  }

  console.log(`UPDATED ${engine}`);
}

if (failures > 0) process.exitCode = 1;
