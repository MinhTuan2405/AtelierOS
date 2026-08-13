# Creative Brief

## Task

Create the public AtelierOS project website inside `src`.

## Classification

Landing page with supporting documentation, changelog, and live demo surfaces.

## Audience

Frontend engineers, design engineers, and technical leads evaluating AtelierOS
from GitHub or deciding how to introduce it into an existing frontend project.

## Primary Goal

Make the orchestration model understandable and give visitors a direct path to
the documentation, interactive demo, and source repository.

## Required Content and Functionality

- Home route with product positioning, architecture, engine routing, and CTA.
- Docs route covering installation, structure, commands, memory, and engines.
- Changelog route grounded in actual repository milestones.
- Live Demo route with a functional workflow-route composer.
- Persistent external link to `https://github.com/MinhTuan2405/AtelierOS`.

## Existing System to Preserve

- Repository architecture, command names, engine roles, and current capabilities.
- Static-host compatibility without server-side route rewrites.

## Brand Direction

Technical atelier: editorial systems manual, drafting-grid materiality, direct
copy, warm/cool neutral surfaces according to system theme, and one signal-orange
accent. Avoid generic SaaS gloss and fake product UI.

## Constraints

- React/Vite implementation with semantic HTML and no unnecessary runtime state.
- Responsive from 320px through wide desktop and WCAG 2.2 AA target.
- Motion must be purposeful and reduced-motion safe.

## References and Anti-References

Use the repository's own architecture diagrams and file structure as visual
material. Do not copy an external product site or invent customer evidence.

## Assumptions

- The first public release is `v0.1.0`; website work remains unreleased.
- GitHub Pages or equivalent static hosting is a likely deployment target.

## Open Questions

- None blocking; deployment automation can be added separately.

## Success Criteria

- All requested destinations are navigable and keyboard accessible.
- The live demo produces a meaningful route from real toolkit concepts.
- Production build, typecheck, lint, and tests pass.
- Design review has no unresolved BLOCKER or MAJOR findings.
