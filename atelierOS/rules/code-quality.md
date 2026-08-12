# Frontend Code Quality Rules

## Preserve and Reuse

- Preserve required behavior, public component contracts, analytics, content,
  routes, and states unless the request changes them.
- Search for existing tokens, primitives, components, and layout patterns before
  creating new ones.
- Extend an existing component when the variants share behavior and semantics;
  create a new component when forcing reuse would create conditional complexity.
- Do not install a dependency for a small capability already provided by the
  platform or project.

## Components and State

- Keep components focused on one coherent responsibility, but do not fragment
  markup into wrappers with no reusable behavior or meaning.
- Keep state as local as practical and derive values rather than synchronizing
  duplicate state.
- Model loading, empty, error, disabled, and success states explicitly where the
  workflow can produce them.
- Use stable data identifiers, not array positions, for dynamic collections.

## Styling

- Use the project's existing styling strategy and naming conventions.
- Prefer design tokens or documented custom properties over repeated literals.
- Avoid one-off values unless they are an intentional optical correction.
- Keep responsive behavior near the component or system that owns it.
- Avoid specificity escalation, global leakage, and duplicated breakpoint logic.

## Markup and Behavior

- Use semantic HTML and progressive enhancement where appropriate.
- Keep presentation separate from domain and data-fetching concerns when that
  separation makes either part easier to understand or test.
- Avoid placeholder controls, fabricated data behavior, and dead interactions.
- Treat warnings, hydration errors, unstable layout, and broken focus as defects.

## Verification

- Run the repository's formatter, lint, typecheck, tests, and accessibility tools
  when available.
- Add or update tests for behavior that can regress; do not test only snapshots
  when user-visible behavior can be asserted directly.
- Review the rendered result, not only source code.
- Keep changes scoped and remove abandoned experiments before completion.
