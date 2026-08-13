# Product Context

## Product Name

AtelierOS

## Product Description

AtelierOS is an open-source orchestration toolkit for AI-assisted frontend
design. It combines durable product context, design memory, explicit workflows,
category profiles, review rules, and replaceable design engines so coding agents
can produce intentional interfaces instead of isolated prompt output.

## Audience

Primary users are frontend engineers and design engineers who use coding agents
inside an existing repository. Secondary users are product designers and
technical leads who need AI-generated UI work to remain consistent, reviewable,
and grounded in product requirements.

## Problem

Coding agents can generate polished screens but lose product context between
sessions, blend incompatible design advice, and skip responsive or accessibility
review. Teams need a repeatable system that directs those tools without locking
the project to one model, editor, or aesthetic engine.

## Positioning

AtelierOS is the control layer, not another visual style. It routes product
context and persistent design decisions through the right profile, workflow,
and engine, then requires review before substantial UI work is complete.

## Goals

- Help a new user understand the orchestration model within one minute.
- Let developers install, inspect, and run the toolkit from a repository root.
- Keep generated frontend work traceable to durable context and explicit review.

## Non-Goals

- Replace product judgment, user research, or accessibility testing.
- Merge every design engine into a single universal aesthetic.
- Host or execute AI models itself.

## Brand Voice

Direct, precise, and quietly opinionated. Use workshop and systems language only
when it clarifies how the toolkit works. Avoid inflated AI claims, fake metrics,
and mystical language about creativity.

## Constraints

- The website must deploy as a static application and work without route rewrites.
- Public interfaces target WCAG 2.2 AA and support reduced motion.
- Claims must reflect capabilities present in the repository.
- Taste and Impeccable remain replaceable upstream Git submodules.

## Competitors

- Standalone frontend skills: useful engine-level guidance, but without the
  repository-owned orchestration and memory layer AtelierOS provides.
- Generic prompt libraries: easier to copy, but not stateful, routed, or reviewed.

## Anti-References

- Generic AI SaaS landing pages with glowing gradients, fake dashboards, and
  unsupported productivity claims because they obscure the actual toolkit.
- IDE-style visual noise that makes documentation harder to read.
