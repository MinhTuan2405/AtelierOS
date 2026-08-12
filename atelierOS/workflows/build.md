# Build Workflow

## Goal

Implement the approved shape and direction without losing functionality,
accessibility, responsiveness, or maintainability.

## Inputs

- implementation map from shape
- current `src/DESIGN.md` and relevant decisions
- existing source, components, tokens, tests, and repository conventions
- `atelierOS/rules/accessibility.md`, `responsive.md`, and `code-quality.md`

## Process

1. Inspect the relevant implementation and identify reusable components, tokens,
   utilities, and behavior before editing.
2. Establish or update semantic structure and content hierarchy first.
3. Reuse existing components. Add a component or variant only when it has a
   clear owner and avoids duplication without creating conditional sprawl.
4. Preserve routes, data behavior, validation, analytics, and interaction unless
   the request explicitly changes them.
5. Implement the state matrix, including non-happy paths.
6. Implement responsive behavior as a content transformation, not a final set of
   emergency media queries.
7. Provide accessible names, focus behavior, keyboard operation, contrast, and
   reduced-motion handling.
8. Use the existing styling and token system. Do not create a parallel palette,
   spacing scale, radius scale, or shadow system.
9. Use representative content and real behavior. Do not create fake controls,
   charts, metrics, or unsupported claims.
10. Verify incrementally at narrow and wide widths while implementing.
11. Run available formatting, lint, typecheck, tests, and focused accessibility
   checks. Correct root causes rather than suppressing failures.
12. Remove experiments, dead styles, and temporary assets.

## Implementation Contract

- Reuse existing components.
- Preserve functionality.
- Use semantic markup.
- Implement responsive behavior.
- Make interaction accessible.
- Keep styling and component code maintainable.
- Add dependencies only with clear, recorded value.

## Exit Gate

The required behavior works, the selected design direction is represented,
important states and viewports are implemented, and available code checks pass.
Proceed to review; implementation is not completion.
