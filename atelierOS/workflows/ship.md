# Ship Workflow

## Goal

Confirm frontend work is releasable and leave project design memory stronger for
the next human or AI session.

## Release Gate

1. Confirm there are no unresolved BLOCKER findings.
2. Resolve MAJOR findings or record explicit user acceptance.
3. Verify required behavior and content against the request and product context.
4. Verify responsive behavior at representative narrow, medium, laptop, and wide
   widths, including relevant touch and long-content cases.
5. Complete accessibility review: semantics, keyboard, focus, contrast, zoom,
   state announcements, and reduced motion as applicable.
6. Confirm consistency with `src/DESIGN.md`, existing components, and tokens.
7. Run the available detector or audit, lint, typecheck, accessibility checks,
   and tests through `pnpm design:check` and project-specific commands.
8. Check for fake functionality, placeholder content presented as final, dead
   styles, debug output, and unjustified dependencies.
9. Append meaningful reusable decisions to `src/.design/DECISIONS.md`.
10. Add a concise entry to `src/.design/CHANGELOG.md` when the design language
    or reusable patterns changed.
11. Report checks not run and why; never represent unavailable tools as passing.

## Decision Test

Record a choice when it will guide future work across sessions, components, or
screens. Do not record transient implementation details already clear from code.

## Output

```text
Shipped scope:
Review disposition:
Responsive verification:
Accessibility verification:
Automated checks:
Design memory updated:
Known follow-ups:
```

## Exit Gate

The release gate is satisfied, design memory reflects durable decisions, and all
unverified risks or unavailable external capabilities are explicit.
