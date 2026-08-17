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
- [Beginner Portfolio Walkthrough](#beginner-portfolio-walkthrough)
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

## Beginner Portfolio Walkthrough

This walkthrough is for someone who has not built a frontend before and does not
yet have portfolio projects. It assumes a coding agent will inspect and edit the
repository. AtelierOS provides that agent with context and review rules; it is
not a visual site builder and it does not write or deploy the portfolio by
itself.

### Decide whether this is the right starting point

AtelierOS is a reasonable fit when all of the following are true:

- you can install Git, Node.js, and pnpm, or have an agent help you do so
- you have access to a coding agent that can read repository instructions
- you are willing to answer questions about your goals, identity, and content
- you want the result to be source code that you can continue changing

A hosted no-code builder may be a better first tool when you want to publish by
choosing a template and editing text without working with a repository. The root
project does not currently grant redistribution rights. Unless you own the
repository or have separate permission, do not deploy or redistribute a fork
until an applicable root license exists. Review the [License](#license) section
before continuing beyond local development.

### 1. Start with an honest content inventory

Do not ask an agent to invent clients, outcomes, testimonials, job history, or
case studies. If you do not have finished projects yet, make the first release a
personal profile or learning portfolio with:

- your name and a plain-language introduction
- the kind of work you are learning or want to pursue
- current skills, described without overstating proficiency
- education, employment, volunteering, or transferable experience when relevant
- small experiments, coursework, or learning notes clearly labeled as such
- a resume link if you have one
- one safe contact method

It is acceptable for the first release to have no project gallery. A focused
personal site with accurate content is stronger than a portfolio built from fake
evidence. Add case studies later as real work becomes available.

Before editing files, collect the answers to these questions in plain text:

1. What name should appear publicly?
2. What role or field are you pursuing?
3. Who should understand or contact you after visiting?
4. What can you truthfully show today?
5. What are you learning now?
6. Which email address or social profile is safe to publish?
7. Is there any personal information that must remain private?
8. Name two websites you like and the specific qualities you like about them.

### 2. Create a safe working copy

Clone the repository and install it using the [Quick Start](#quick-start). Create
a separate branch before replacing the included website:

```bash
git switch -c portfolio
```

The configured frontend project is `src/`. On the product branch, that directory
contains the AtelierOS public website, so a portfolio build will intentionally
replace its product content and interface. The reusable orchestration toolkit
remains under `atelierOS/`.

Run the existing application once before asking the agent to change it:

```bash
pnpm --dir src dev
```

Open the local URL printed by Vite. This confirms that Node.js, pnpm, and the
application work before portfolio changes begin. Stop the server with `Ctrl+C`.

### 3. Replace the product context

Edit `src/PRODUCT.md`. Replace the AtelierOS product facts rather than appending
portfolio facts beneath them. A small first draft can follow this structure:

```markdown
# Product Context

## Product Name

[Your name] Portfolio

## Product Description

A personal website introducing [your name], current skills, learning work, and
the best way to make contact.

## Audience

[For example: internship recruiters, local clients, or other developers.]

## Problem

Visitors need a quick, truthful way to understand who I am, what I am learning,
what evidence I can currently show, and how to contact me.

## Goals

- Help a visitor understand my direction within one minute.
- Make my current work and experience easy to scan.
- Provide one clear contact path.

## Non-Goals

- Present learning exercises as paid client work.
- Claim skills, employers, results, or testimonials I cannot verify.

## Brand Voice

Clear, curious, grounded, and concise. Avoid exaggerated expertise and generic
claims such as "world-class" or "pixel-perfect."

## Constraints

- Do not publish private addresses, phone numbers, or other sensitive details.
- Support keyboard use, mobile screens, reduced motion, and readable contrast.
```

Facts that should remain true across future redesigns belong in `PRODUCT.md`.
Instructions for only the current build belong in the active brief instead.

### 4. Define a visual direction without frontend vocabulary

You do not need to know CSS terminology before editing `src/DESIGN.md`. Describe
observable preferences and let the agent translate them into a system. Useful
inputs include:

- whether the site should feel quiet, energetic, technical, editorial, or playful
- light, dark, or system-controlled appearance
- examples of type that feels appropriate, such as formal, geometric, or human
- how much information should be visible at once
- whether motion should be absent, restrained, or expressive
- qualities from reference sites and qualities that must not be copied

Avoid instructions that only say "make it modern" or "make it cool." A more
actionable entry is: "Use a calm editorial layout, warm neutral colors, readable
body text, restrained motion, and one blue accent. Avoid glass effects, large
empty hero areas, and skill percentage bars."

A complete first draft can follow this structure:

```markdown
# Design System Memory

## Visual Direction

Calm editorial portfolio with clear hierarchy, useful density, and no decorative
effects that compete with the writing.

## Color System

Use warm neutral backgrounds, dark readable text, and one blue accent for links,
focus, and primary actions. Maintain WCAG AA contrast in every supported theme.

## Typography

Use one readable sans-serif family for display and body text. Keep body copy
under 68 characters per line and avoid extremely oversized headings.

## Spacing

Use a consistent spacing scale. Keep related labels and content close together,
and use larger gaps to separate major sections.

## Radii

Use small, restrained corner radii on interactive controls. Do not turn every
content section into a rounded card.

## Shadows

Avoid decorative shadows. Use spacing, borders, and background changes for
hierarchy.

## Grid and Layout

Use a readable content column with occasional asymmetric layouts for real work
or learning artifacts. Collapse to one column when space becomes limited.

## Components

Use consistent treatments for navigation, section headings, project or learning
entries, links, buttons, and contact details.

## Interaction

Keep links and controls keyboard accessible with visible focus. Do not add fake
buttons, inactive filters, or hover-only information.

## Motion

Use short state transitions only. Respect reduced-motion preferences and never
delay access to content.

## Responsive Rules

Support 320px through wide desktop, realistic long text, and readable reflow at
200% zoom. Preserve the introduction and contact path at every width.

## Accessibility Requirements

- Target WCAG 2.2 AA.
- Use semantic landmarks and a logical heading order.
- Keep touch targets comfortable and do not communicate meaning through color
  alone.
```

Record reference links and the exact qualities you want in
`src/.design/REFERENCES.md`. References are direction, not permission to copy a
site's identity, layout, text, or assets.

### 5. Write the first build brief

Replace the placeholders in `src/.design/BRIEF.md`. For a beginner without case
studies, a useful first brief is:

```markdown
# Creative Brief

## Task

Replace the current application with a responsive one-page personal portfolio.

## Classification

Portfolio.

## Audience

[Your primary audience and why they visit.]

## Primary Goal

Help visitors understand my direction and contact me without implying experience
I do not have.

## Required Content and Functionality

- Introduction with my name, direction, and primary contact action.
- About section with a short biography.
- Current skills and learning interests using accurate proficiency language.
- Experience, education, experiments, or learning notes when content exists.
- Contact section with verified links.
- Responsive navigation and visible keyboard focus.

## Existing System to Preserve

- React, TypeScript, and Vite build scripts.
- AtelierOS project memory and review workflow.

## Constraints

- Do not fabricate projects, metrics, testimonials, or employers.
- Do not expose private personal information.
- Work from 320px through wide desktop and at 200% zoom.
- Meet WCAG 2.2 AA and respect reduced-motion preferences.

## Open Questions

- Ask before using a photograph, resume file, social profile, or external service.

## Success Criteria

- Every public statement is supplied or approved by me.
- The page is understandable without a project gallery.
- Contact links work and the main path is keyboard accessible.
- Lint, typecheck, tests, and production build pass.
```

Remove sections that have no real content rather than filling them with generic
copy. Keep a real empty state only when it helps visitors understand that work is
coming soon; otherwise omit the section until it has evidence.

### 6. Give the coding agent a complete request

After the three context files are ready, send the coding agent a prompt such as:

```text
Build my first personal portfolio in the src application. I am new to frontend
development and do not have finished portfolio projects yet.

Use DesignKernel and the portfolio profile. Read src/PRODUCT.md, src/DESIGN.md,
src/.design/BRIEF.md, src/.design/REFERENCES.md, and
src/.design/DECISIONS.md before editing. Inspect the current React and Vite
application, then replace the product website with the smallest honest portfolio
described by the brief.

Do not invent projects, clients, metrics, testimonials, skills, social links, or
personal details. If missing information would materially change the structure,
ask me one clear question. Otherwise state a conservative assumption.

Implement semantic HTML, keyboard access, visible focus, responsive behavior
from 320px upward, readable reflow at 200% zoom, and reduced-motion support. Use
real links and actions only. Run the available checks, complete the DesignKernel
review, fix BLOCKER and MAJOR findings, and record durable design decisions.
```

The agent should select `atelierOS/profiles/portfolio.md` and normally route the
work through discovery, art direction, shape, build, review, and ship. You should
not need to select individual design engines yourself.

### 7. Review the content and behavior

Read every sentence before publishing. Confirm that names, dates, links, skill
descriptions, and contact details are accurate. Then run:

```bash
pnpm design:doctor
pnpm design:check
pnpm --dir src build
pnpm --dir src preview
```

Use the preview URL to inspect at least a narrow phone width and a laptop width.
Navigate using only `Tab`, `Shift+Tab`, `Enter`, and arrow keys where relevant.
Check that focus remains visible, headings are in a sensible order, links have
clear names, text does not clip, and motion is not required to understand the
page.

`pnpm design:check` only runs capabilities exposed by `src/package.json`; a
reported skip means that capability is not configured, not that it passed.
Automated checks also do not prove that the writing is accurate or the rendered
site is usable.

### 8. Prepare to publish and improve gradually

First confirm that you have permission to publish and redistribute the code. The
repository currently has no root license, so someone who does not own it or have
separate permission should stop at the local, build-ready result until an
applicable license is added.

When you have permission, the production build is written to `src/dist/`. The
included Vite configuration uses relative assets, and the current application
uses hash routes so it can work on static hosting without route rewrite rules.
Hosting account setup, domain configuration, analytics, and form processing are
separate choices and are not automated by AtelierOS. Follow the selected hosting
provider's instructions for publishing the contents of `src/dist/`.

After publishing, build small real artifacts and add them one at a time. A useful
first case study can be a learning project if it clearly states:

- why you made it
- what part you personally completed
- the constraints or mistakes you encountered
- what changed after testing or feedback
- a working link or source link when safe to share

Update `PRODUCT.md` only when durable facts change. Use a new `BRIEF.md` task for
each meaningful addition, and append accepted long-term choices to
`.design/DECISIONS.md`.

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
