# DesignKernel

DesignKernel is an orchestration layer for AI-assisted frontend design.

It combines multiple design engines with persistent product context,
project-specific design memory, workflows, profiles, review rules, and
coding-agent adapters.

DesignKernel does not try to merge every design opinion into one style. It
routes the right context and engine to the right stage, resolves conflicts using
an explicit priority order, and requires review before substantial UI work is
considered complete.

This repository is the v0.1 scaffold. `src/` is intentionally a placeholder
workspace; no demo application is included.

## Architecture

```text
                     USER
                       │
                       ▼
                DesignKernel
                       │
               Design Director
                       │
        ┌──────────────┼──────────────┐
        │              │              │
      Rules         Profiles      Workflows
        │              │              │
        └──────────────┼──────────────┘
                       │
                 Engine Routing
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
           Taste            Impeccable
             │                   │
             └─────────┬─────────┘
                       ▼
                    Project
                       │
                       ▼
               Review → Audit
```

The operational route is:

```text
User Request
     ↓
Design Director
     ↓
Product Context + Design Context + Rules + Profile + Workflow
     ↓
Select / combine engines
     ↓
Taste + Impeccable
     ↓
Implementation
     ↓
Review
     ↓
Audit
```

## Directory Responsibilities

| Directory | Responsibility |
| --- | --- |
| `atelierOS/` | The complete design toolkit: kernel, engines, rules, profiles, workflows, adapters, templates, and scripts. |
| `src/` | The actual application workspace, product context, design system memory, decisions, source, and assets. |
| Root files | Whole-system configuration, workspace orchestration, documentation, and agent entry points. |

## Getting Started

Requirements: Node.js 18.18 or newer and pnpm.

```bash
pnpm install
pnpm design:setup
pnpm design:doctor
```

Then replace the prompts in:

```text
src/PRODUCT.md
src/DESIGN.md
src/.design/BRIEF.md
```

Application work happens inside `src/`. Replace its placeholder
`package.json` when selecting the actual frontend stack.

`design:setup` creates missing project memory and integration directories, then
performs an initial agent sync. It never overwrites project design files unless
you explicitly run:

```bash
pnpm design:setup -- --force
```

## External Engines

Taste and Impeccable are vendored as replaceable upstream Git checkouts in:

```text
atelierOS/engines/taste/
atelierOS/engines/impeccable/
```

The slots contain Git-managed checkouts of
[Taste Skill](https://github.com/Leonxlnx/taste-skill) and
[Impeccable](https://github.com/pbakaus/impeccable). Their canonical skill
entry points are declared in `designkernel.config.json`; `pnpm design:update`
fetches and fast-forwards clean checkouts.

Engine absence does not prevent the kernel documentation from working, but
`design:doctor` reports enabled missing engines as warnings and engine-specific
workflows have reduced capability.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm design:setup` | Initialize missing project memory, directories, and agent integrations without overwriting existing memory. |
| `pnpm design:sync` | Synchronize generated skills and thin agent pointers from kernel source files. |
| `pnpm design:doctor` | Validate required files, configuration, engines, integrations, and symlinks. |
| `pnpm design:update` | Fast-forward clean Git-managed upstream engines without touching custom DesignKernel content. |
| `pnpm design:check` | Detect and run available project detector, lint, typecheck, accessibility, and test scripts. |

Use `pnpm design:update -- --engine taste` to target one configured engine.

`design:check` does not assume a frontend stack. It discovers scripts in
`src/package.json` using aliases configured under `checks` in
`designkernel.config.json`. Missing capabilities are reported and skipped.

## Agent Adapters

Codex, Cursor, and Claude Code adapters are enabled by default. GitHub Copilot is
documented but disabled until enabled in `designkernel.config.json`.

Adapters contain pointers, not forked rulebooks. Generated files include a
DesignKernel marker; sync refuses to overwrite a colliding file it does not own.
The source of truth remains:

```text
atelierOS/kernel/
atelierOS/rules/
atelierOS/profiles/
atelierOS/workflows/
src/PRODUCT.md
src/DESIGN.md
src/.design/
```

## Design Memory

- `PRODUCT.md` stores durable product facts and positioning.
- `DESIGN.md` stores the established visual and interaction system.
- `.design/BRIEF.md` stores the current creative brief.
- `.design/REFERENCES.md` records what is useful and what must not be copied.
- `.design/DECISIONS.md` is an append-only record that prevents later sessions
  from reinventing resolved choices.
- `.design/CHANGELOG.md` records meaningful changes to reusable design language.

## Philosophy

DesignKernel should not blindly merge multiple design systems. It should
orchestrate them.

Taste can drive art direction and challenge generic visual choices. Impeccable
can lead product structure, shaping, critique, and refinement. Product
requirements, project memory, accessibility, and established conventions remain
higher-priority constraints. Engines stay replaceable because custom behavior
never lives in their upstream source.
