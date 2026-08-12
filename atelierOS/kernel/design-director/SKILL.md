# Design Director

## Role

The Design Director is the primary DesignKernel orchestration skill. It turns a
frontend request into an explicit route through product context, design memory,
rules, a profile, a workflow, external engines, implementation, and review.

It directs work; it does not replace product requirements or silently invent a
new design language.

## Required Inputs

Before substantial frontend or design work:

1. Read the current user request.
2. Read `src/PRODUCT.md`.
3. Read `src/DESIGN.md`.
4. Read `src/.design/BRIEF.md`, `REFERENCES.md`, and `DECISIONS.md`.
5. Inspect the existing implementation and components relevant to the task.
6. Read `atelierOS/kernel/constitution/DESIGN-CONSTITUTION.md` and `PRIORITY.md`.
7. Load the relevant files from `atelierOS/rules/`, `atelierOS/profiles/`, and `atelierOS/workflows/`.

Treat missing or placeholder context as uncertainty. Ask only for information
that changes the route or implementation materially; otherwise state a
reasonable assumption and continue.

## Orchestration Model

```text
User Request
     |
     v
Design Director
     |
     v
Product Context + Design Context + Rules + Profile + Workflow
     |
     v
Select / combine engines
     |
     v
Taste + Impeccable
     |
     v
Implementation
     |
     v
Review
     |
     v
Audit
```

## Task Classification

Classify the request before choosing tools. Supported classifications include:

- marketing / landing page
- SaaS product
- dashboard
- ecommerce
- portfolio
- editorial
- redesign
- individual component
- visual refinement
- audit

When a task spans categories, choose one primary classification and name any
secondary concern. Do not average incompatible approaches.

## Profile Selection

Use the closest profile in `atelierOS/profiles/`:

| Task | Default profile |
| --- | --- |
| Marketing or landing page | `landing-page.md` |
| SaaS application or product UI | `saas-product.md` |
| Operational or analytical interface | `dashboard.md` |
| Storefront, product detail, cart, or checkout | `ecommerce.md` |
| Personal, studio, or case-study site | `portfolio.md` |
| Publication or content-led experience | `editorial.md` |

For an individual component, inherit the host screen's profile. For a redesign,
retain the product category profile and add `atelierOS/workflows/redesign.md`.

## Workflow Selection

- New substantial surface: `discovery` -> `art-direction` when needed ->
  `shape` -> `build` -> `review` -> `ship`.
- Existing surface redesign: `redesign` -> `review` -> `ship`.
- Individual component: focused `shape` -> `build` -> `review`.
- Visual refinement: focused `build` using refinement guidance -> `review`.
- Audit: `review` only; do not implement unless requested.

Use only the stages needed, but never omit review for major UI work.

## Engine Routing

Engines are replaceable upstream dependencies under `atelierOS/engines/`. Confirm an
engine is installed before relying on it. If unavailable, continue using the
kernel, rules, profiles, and workflows, and report the reduced capability.

Load only the routed canonical entry point unless a workflow explicitly needs a
supporting engine reference:

- Taste: `atelierOS/engines/taste/skills/taste-skill/SKILL.md`
- Impeccable: `atelierOS/engines/impeccable/plugin/skills/impeccable/SKILL.md`

Do not load every Taste variant or Impeccable provider artifact. The upstream
repositories remain replaceable dependencies; project and AtelierOS policy stay
outside them.

### Marketing / Landing Page

```text
Taste
-> art direction
-> Impeccable shape
-> implementation
-> Taste pre-flight review
-> Impeccable polish
-> audit
```

Use Taste to establish a distinctive visual premise and identify generic AI
patterns. Use Impeccable to make structure, responsive behavior, and finishing
coherent.

### Product UI / Dashboard

```text
Impeccable
-> product structure
-> implementation
-> optional Taste aesthetic guidance
-> Impeccable critique
-> audit
```

Taste is secondary and selective. It must not override usability, information
architecture, product density, established interaction patterns, or an existing
product design system.

### Redesign

```text
existing UI audit
-> preserve important product and brand constraints
-> Taste visual exploration
-> Impeccable shape
-> implementation
-> critique
-> polish
-> audit
```

Start from evidence. Identify what must remain before changing visual language.

### Visual Refinement

Prefer Impeccable refinement commands or workflows. Add Taste only when art
direction or anti-generic guidance materially improves the outcome.

### Other Tasks

- Ecommerce: Impeccable leads task flow, trust, state coverage, and conversion
  structure; Taste may lead campaign or editorial expression.
- Portfolio: Taste usually leads narrative and visual identity; Impeccable
  validates clarity, responsive behavior, and implementation finish.
- Editorial: Taste may lead composition and typographic expression; Impeccable
  protects reading flow, navigation, and content usability.
- Audit: use the Design Reviewer. Engines may contribute critique, but the
  reviewer owns severity and the final consolidated findings.

## Conflict Resolution

1. Apply `atelierOS/kernel/constitution/PRIORITY.md` exactly.
2. Name the conflicting instructions.
3. Choose the higher-priority instruction and explain any meaningful tradeoff.
4. If the conflict cannot be resolved without changing product behavior or a
   current user requirement, ask the user before implementation.
5. Never blend conflicting systems arbitrarily.

Engine output is advice, not authority. Never copy upstream guidance into the
kernel or modify upstream engine source to resolve a project-level conflict.

## Execution Contract

For each substantial task, maintain a compact route:

```text
Classification:
Profile:
Workflow:
Engines:
Constraints preserved:
Review required:
```

Then execute the selected workflow. Reuse existing tokens and components,
preserve required behavior, implement responsive and accessible states, and
keep changes no larger than necessary.

## Completion Gate

Major UI work is not complete until:

1. `atelierOS/kernel/design-reviewer/SKILL.md` has been applied.
2. BLOCKER and MAJOR findings are resolved or explicitly accepted by the user.
3. Responsive and accessibility checks have been performed.
4. Implementation fidelity and existing functionality have been checked.
5. Durable choices have been appended to `src/.design/DECISIONS.md`.
6. Relevant checks have been run through `pnpm design:check` where available.
