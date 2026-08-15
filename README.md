# AtelierOS

AtelierOS is an open-source orchestration toolkit for AI-assisted frontend
design. It gives coding agents a durable control layer made from product context,
design memory, category profiles, executable workflows, quality rules, and a
required review gate.

It does not generate interfaces by itself and it does not host an AI model.
Instead, it helps an agent understand what it is designing, select the right
guidance, preserve project decisions, and verify the result before completion.

This repository contains both the reusable toolkit under `atelierOS/` and the
AtelierOS product website under `src/`.

## Contents

- [Why AtelierOS](#why-atelieros)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Run the Website](#run-the-website)
- [How to Use AtelierOS](#how-to-use-atelieros)
- [Common Use Cases](#common-use-cases)
- [Project Memory](#project-memory)
- [Configuration](#configuration)
- [Customization](#customization)
- [Commands](#commands)
- [Directory Structure](#directory-structure)
- [Engine Management](#engine-management)
- [Quality and Review](#quality-and-review)
- [Troubleshooting](#troubleshooting)

## Why AtelierOS

Coding agents can produce polished UI while still losing product context,
blending incompatible visual advice, skipping responsive states, or forgetting
decisions made in an earlier session. AtelierOS makes that process explicit:

```text
User request
     |
     v
Design Director
     |
     v
Product context + design memory + rules
     |
     v
Profile + workflow + engine routing
     |
     v
Implementation
     |
     v
Design review + quality checks
     |
     v
Recorded decision
```

The repository remains the source of truth. Engine recommendations are advice,
not project policy.

## Requirements

Required:

- [Git](https://git-scm.com/) with submodule support
- [Node.js](https://nodejs.org/) 18.18 or newer
- [pnpm](https://pnpm.io/)
- A coding agent or editor that can read repository instructions

Supported agent adapters:

| Agent | Enabled by default | Generated integration |
| --- | --- | --- |
| Codex | Yes | `src/.codex/designkernel.md` |
| Cursor | Yes | `src/.cursor/rules/designkernel.mdc` |
| Claude Code | Yes | `src/.claude/commands/designkernel.md` |
| GitHub Copilot | No | `src/.github/instructions/designkernel.instructions.md` |

Taste and Impeccable are included as Git submodules. AtelierOS still works when
an optional engine is unavailable, but engine-specific guidance is reduced and
`pnpm design:doctor` reports a warning.

## Quick Start

Clone the repository with its engine submodules:

```bash
git clone --recurse-submodules https://github.com/MinhTuan2405/AtelierOS.git
cd AtelierOS
pnpm install
pnpm design:setup
pnpm design:doctor
```

If the repository was cloned without submodules, initialize them afterward:

```bash
git submodule update --init --recursive
```

`pnpm design:setup` performs a safe initial setup. It creates missing project
memory, required directories, shared skills, and enabled agent adapters. Existing
memory files are skipped unless `--force` is explicitly supplied.

A healthy setup ends with:

```text
DESIGNKERNEL STATUS: READY
```

Warnings about disabled or intentionally absent optional engines do not prevent
the kernel from working. Missing required files or broken generated adapters do.

## Run the Website

The included product website is a React and Vite application in `src/`.

Start the development server:

```bash
pnpm --dir src dev
```

Create a production build:

```bash
pnpm --dir src build
```

Preview the production build:

```bash
pnpm --dir src preview
```

The website uses static hash routes, so it can deploy to GitHub Pages or another
static host without route rewrite rules.

Available website destinations:

| Route | Purpose |
| --- | --- |
| `#/` | Product introduction and orchestration model |
| `#/docs` | Installation, structure, commands, memory, and engines |
| `#/changelog` | Public toolkit and website milestones |
| `#/demo` | Interactive route composer using real toolkit concepts |

## How to Use AtelierOS

### 1. Describe the product

Edit `src/PRODUCT.md` before asking an agent for substantial frontend work.
Record durable facts such as:

- product name and purpose
- audience and user problems
- positioning and credible claims
- goals and non-goals
- brand voice
- technical, legal, and accessibility constraints

Do not put temporary task instructions in `PRODUCT.md`.

### 2. Describe the design system

Edit `src/DESIGN.md` with the visual and interaction language the project should
preserve:

- semantic colors and themes
- typography and text measure
- spacing, layout, radii, and elevation
- components and interaction patterns
- responsive behavior
- motion rules
- accessibility requirements

This file should describe durable design policy, not one screen concept.

### 3. Define the active task

Edit `src/.design/BRIEF.md` for the current body of work. Include the audience,
goal, required behavior, preservation boundaries, constraints, references, open
questions, and success criteria.

Keep task-specific requirements here so they can change without rewriting the
global product or design system.

### 4. Ask the agent to use DesignKernel

For a substantial frontend request, tell the agent what to build and ask it to
follow the repository's DesignKernel instructions.

Example:

```text
Redesign the onboarding flow. Preserve the existing account API and analytics.
Use DesignKernel, verify mobile and keyboard behavior, and complete the design
review before finishing.
```

Enabled adapters point the agent to the same source-of-truth process:

1. Read `PRODUCT.md`, `DESIGN.md`, and relevant `.design/` memory.
2. Load the Design Director.
3. Classify the surface.
4. Select one profile and the required workflow stages.
5. Assign explicit jobs to installed engines.
6. Preserve existing behavior and project constraints.
7. Implement responsive and accessible states.
8. Apply the Design Reviewer.
9. Resolve BLOCKER and MAJOR findings.
10. Append durable choices to `DECISIONS.md`.

Claude Code users can also invoke the generated `/designkernel` command. Other
enabled adapters apply their generated repository instructions automatically or
make them available to the agent.

### 5. Run project checks

From the repository root:

```bash
pnpm design:check
```

This command discovers matching scripts in the configured project package and
runs the available detector, lint, typecheck, accessibility, and test checks.
Missing capabilities are reported and skipped instead of being fabricated.

## Common Use Cases

AtelierOS includes profiles for different frontend categories:

| Use case | Profile | Typical emphasis |
| --- | --- | --- |
| Marketing site | `landing-page` | Positioning, proof, conversion, responsive storytelling |
| SaaS application | `saas-product` | Task flow, states, navigation, component reuse |
| Dashboard | `dashboard` | Density, scanning, data integrity, narrow-screen strategy |
| Ecommerce | `ecommerce` | Trust, product decisions, checkout, recovery states |
| Portfolio | `portfolio` | Narrative, artifact hierarchy, pacing, contact path |
| Editorial site | `editorial` | Reading flow, typography, navigation, content hierarchy |

Available workflows cover:

- discovery
- art direction
- shaping structure before implementation
- building
- redesigning an existing surface
- reviewing
- shipping

The Design Director selects only the stages needed for the request. It should not
load every profile, workflow, or design engine at once.

## Project Memory

Project-owned memory lives under the configured `projectRoot`.

| File | Responsibility |
| --- | --- |
| `PRODUCT.md` | Durable product facts, audience, positioning, and constraints |
| `DESIGN.md` | Durable visual, interaction, responsive, and accessibility system |
| `.design/BRIEF.md` | Current task scope, behavior, assumptions, and acceptance criteria |
| `.design/REFERENCES.md` | Useful qualities from references and what must not be copied |
| `.design/DECISIONS.md` | Append-only record of durable decisions and rejected alternatives |
| `.design/CHANGELOG.md` | Meaningful changes to the reusable design language |
| `.design/audits/` | Saved design and implementation audits |
| `.design/screenshots/` | Representative rendered evidence used during review |

Use `DECISIONS.md` as an append-only log. When a decision changes, add a new
entry that explicitly supersedes the old one rather than rewriting history.

## Configuration

Repository-level behavior is configured in `designkernel.config.json`.

```json
{
  "version": 1,
  "projectRoot": "./src",
  "defaultProfile": "saas-product",
  "engines": {
    "taste": {
      "enabled": true,
      "repository": "https://github.com/Leonxlnx/taste-skill.git",
      "entrypoint": "skills/taste-skill/SKILL.md"
    },
    "impeccable": {
      "enabled": true,
      "repository": "https://github.com/pbakaus/impeccable.git",
      "entrypoint": "plugin/skills/impeccable/SKILL.md"
    }
  },
  "agents": {
    "codex": true,
    "cursor": true,
    "claude": true,
    "copilot": false
  }
}
```

Important fields:

| Field | Meaning |
| --- | --- |
| `projectRoot` | Frontend project containing application code and design memory |
| `defaultProfile` | Fallback profile when a request does not imply a better match |
| `engines.*.enabled` | Whether an engine is available for workflow routing |
| `engines.*.repository` | Official upstream repository used for installation context |
| `engines.*.entrypoint` | Canonical skill file loaded by the Design Director |
| `agents` | Adapters created and maintained by `design:sync` |
| `checks` | Candidate package scripts discovered by `design:check` |

Configured paths must remain inside the repository. Setup and health checks reject
a `projectRoot` that escapes the repository boundary.

## Customization

### Use AtelierOS with another frontend project

Set `projectRoot` to the directory containing that project's `package.json`:

```json
{
  "projectRoot": "./apps/web"
}
```

Then initialize its memory and adapters:

```bash
pnpm design:setup
pnpm design:doctor
```

Setup creates only missing memory and integration files by default. It does not
overwrite established context.

### Customize product and design context

Edit files under the configured project root:

```text
PRODUCT.md
DESIGN.md
.design/BRIEF.md
.design/REFERENCES.md
.design/DECISIONS.md
```

These files have higher priority than profile, workflow, and engine advice. This
is the preferred place for project-specific customization.

### Customize profiles

Profiles live in `atelierOS/profiles/`. Edit or add a profile when a product
category has recurring priorities that should apply across tasks. A profile can
define purpose, layout behavior, density, motion, typography, engine balance,
common risks, and review focus.

If a custom profile should be the fallback, set its filename without `.md` as
`defaultProfile` in `designkernel.config.json`.

### Customize workflows

Workflows live in `atelierOS/workflows/`. Use them for repeatable stages with
clear inputs, process, outputs, and exit gates. Keep project facts out of reusable
workflow files; those belong in project memory.

### Customize rules

Shared quality rules live in `atelierOS/rules/`:

- `accessibility.md`
- `responsive.md`
- `code-quality.md`
- `anti-patterns.md`

Change these only when the policy should apply across projects using this kernel.
Project-specific exceptions belong in the project's `DESIGN.md` or decision log.

### Enable or disable agents

Change the relevant boolean in `designkernel.config.json`, then run:

```bash
pnpm design:sync
pnpm design:doctor
```

Generated adapter files contain a DesignKernel marker. Sync updates files it owns
and protects colliding files that were not generated by AtelierOS.

### Customize quality checks

`design:check` maps capabilities to candidate scripts in the configured project's
`package.json`. Add a project script and list its name under `checks`:

```json
{
  "checks": {
    "detector": ["design:detector", "impeccable:detect"],
    "lint": ["lint"],
    "typecheck": ["typecheck"],
    "accessibility": ["test:a11y", "accessibility"],
    "tests": ["test"]
  }
}
```

For each capability, the first matching script is run.

### Customize the included website

The public AtelierOS website lives in:

```text
src/src/App.tsx
src/src/styles.css
src/public/
```

Update `src/PRODUCT.md`, `src/DESIGN.md`, and the active brief before substantial
visual changes. Keep static hash routing if the site must deploy without server
rewrite support.

## Commands

Run DesignKernel commands from the repository root.

| Command | Purpose |
| --- | --- |
| `pnpm design:setup` | Create missing memory, directories, skills, and enabled adapters |
| `pnpm design:setup -- --no-sync` | Create setup files without synchronizing adapters |
| `pnpm design:setup -- --force` | Overwrite memory templates and design changelog; use with care |
| `pnpm design:sync` | Regenerate shared skills and enabled agent adapters from kernel sources |
| `pnpm design:doctor` | Validate config, required files, profiles, workflows, engines, adapters, and symlinks |
| `pnpm design:update` | Fast-forward clean Git-managed engine checkouts |
| `pnpm design:update -- --engine taste` | Update one enabled engine |
| `pnpm design:check` | Discover and run available frontend quality scripts |

Application commands run inside the configured frontend project. For the included
website:

| Command | Purpose |
| --- | --- |
| `pnpm --dir src dev` | Start Vite development mode |
| `pnpm --dir src build` | Typecheck and create a production build |
| `pnpm --dir src preview` | Preview the production build |
| `pnpm --dir src lint` | Run ESLint |
| `pnpm --dir src typecheck` | Run TypeScript project checks |
| `pnpm --dir src test` | Run Vitest behavior tests |

## Directory Structure

```text
AtelierOS/
|-- AGENTS.md                    agent entry point
|-- designkernel.config.json    project, engine, adapter, and check config
|-- package.json                repository orchestration commands
|-- atelierOS/
|   |-- kernel/                 Design Director, Reviewer, constitution
|   |-- rules/                  accessibility, responsive, code quality
|   |-- profiles/               category-specific design priorities
|   |-- workflows/              executable design stages
|   |-- engines/                replaceable upstream Git submodules
|   |-- adapters/               adapter documentation
|   |-- templates/              initial project-memory templates
|   `-- scripts/                setup, sync, doctor, update, check
`-- src/
    |-- PRODUCT.md              product source of truth
    |-- DESIGN.md               design-system source of truth
    |-- .design/                brief, references, decisions, audits
    |-- src/                    website application source
    `-- package.json            application scripts and dependencies
```

The operational source of truth is split deliberately:

- `atelierOS/` owns reusable orchestration policy.
- The configured project root owns product context, design context, and code.
- `atelierOS/engines/` contains replaceable upstream dependencies.
- Generated agent adapters are pointers, not independent rulebooks.

## Engine Management

Taste and Impeccable are replaceable upstream dependencies:

| Engine | Primary role |
| --- | --- |
| Taste | Art direction, differentiation, composition, anti-generic guidance |
| Impeccable | Structure, state coverage, responsive coherence, critique, refinement |

The exact balance depends on the selected profile and workflow. Product UI often
puts Impeccable first. Art-directed landing pages often give Taste the visual lead.

Update all clean engine checkouts:

```bash
pnpm design:update
```

Update one engine:

```bash
pnpm design:update -- --engine impeccable
```

The updater never modifies kernel or project memory. It skips an engine when the
checkout has local changes, lacks an upstream branch, is not Git-managed, or
cannot be fast-forwarded safely.

Do not place custom project behavior inside `atelierOS/engines/`. Upstream engine
updates may replace it. Put custom policy in the kernel, rules, profiles,
workflows, or project memory.

## Quality and Review

Major UI work is incomplete until the Design Reviewer has been applied.

The review checks:

- preserved functionality and required content
- hierarchy, typography, spacing, layout, and density
- responsive behavior at narrow and wide viewports
- keyboard operation, focus, semantics, contrast, and reduced motion
- loading, empty, error, disabled, and success states when relevant
- consistency with product context and design memory
- component and token reuse
- generic design patterns and unnecessary decoration
- maintainability and implementation quality

Findings use four severities:

| Severity | Meaning |
| --- | --- |
| `BLOCKER` | Prevents release or task completion and must be fixed |
| `MAJOR` | Materially harms usability or fidelity and must be fixed or accepted |
| `MINOR` | Contained quality issue that can be scheduled separately |
| `POLISH` | Optional finishing improvement |

Run the automated capabilities as part of review:

```bash
pnpm design:check
```

Automation supplements rendered, keyboard, responsive, and assistive-technology
review. It does not replace them.

## Troubleshooting

### Engines are missing

If the repository was cloned without submodules:

```bash
git submodule update --init --recursive
pnpm design:doctor
```

### An adapter is missing or outdated

Regenerate enabled integrations and verify them:

```bash
pnpm design:sync
pnpm design:doctor
```

If sync reports `PROTECTED`, a destination file already exists but was not
generated by DesignKernel. Move or intentionally remove the colliding file before
running sync again. The tool will not overwrite it silently.

### Setup skipped a memory file

This is expected when the file already exists. Setup is non-destructive by
default. Review the existing file instead of overwriting it.

Use the following only when replacing all setup-managed memory with templates is
intentional:

```bash
pnpm design:setup -- --force
```

### Quality checks are skipped

`design:check` only runs capabilities exposed by the configured project's
`package.json`. Add a matching script or update the `checks` candidates in
`designkernel.config.json`.

### An engine will not update

`design:update` intentionally skips dirty, detached, non-Git, or non-fast-forward
engine checkouts. Inspect that submodule directly and resolve its Git state before
retrying. The updater never forces an engine update.

### Doctor reports `NEEDS ATTENTION`

Read each preceding warning or error. Typical causes are:

- missing project memory
- an invalid `defaultProfile`
- missing synchronized skills
- enabled but absent adapters
- missing engine entrypoints
- broken symlinks

Run setup or sync for generated files, initialize submodules for engines, and
correct configuration paths before rerunning `pnpm design:doctor`.

## Project Principles

- Product requirements outrank engine advice.
- Accessibility outranks decorative aesthetics.
- Preserve functionality unless the request explicitly changes it.
- Use one dominant visual direction per surface.
- Keep responsive behavior intentional.
- Record durable decisions in project memory.
- Keep engines replaceable and custom policy repository-owned.
- Review substantial frontend work before declaring it complete.

## License

This repository does not currently declare a root license. Do not assume rights
to redistribute the AtelierOS kernel until a project license is added. Taste and
Impeccable each include their own license inside their submodule and remain
governed by those upstream terms.
