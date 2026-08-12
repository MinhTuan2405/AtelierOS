# Review Workflow

## Goal

Run both design review and implementation review, consolidate engine feedback,
and fix the smallest set of root causes needed for completion.

## Inputs

- current request, brief, selected profile, and design decisions
- implementation and changed files
- representative rendered viewports and states where available
- `atelierOS/kernel/design-reviewer/SKILL.md` and all relevant rules

## Design Review

1. Check visual hierarchy, typography, spacing, layout, density, and composition.
2. Check information architecture, primary task flow, and all meaningful states.
3. Check responsive transformations, touch behavior, focus, semantics, contrast,
   zoom, and reduced motion.
4. Check consistency with project design memory and the selected profile.
5. Apply Taste pre-flight or anti-pattern review for art-directed work when
   installed and appropriate.
6. Apply Impeccable critique/refinement when installed and appropriate.
7. Reject engine feedback that conflicts with higher-priority requirements.

## Implementation Review

1. Confirm required functionality and content were preserved.
2. Check component and token reuse; identify accidental parallel systems.
3. Check semantic markup, keyboard behavior, state ownership, and maintainable
   styling.
4. Check for fake interactions, placeholders presented as working behavior,
   unnecessary dependencies, dead code, and avoidable regressions.
5. Run `pnpm design:check` and relevant project checks where available.

## Findings and Fixes

Use the reviewer's `BLOCKER`, `MAJOR`, `MINOR`, and `POLISH` severities. Merge
duplicate observations by root cause. Fix BLOCKER and MAJOR issues first and
re-run affected checks. Do not rewrite the whole UI when a targeted fix suffices.

## Output

```text
Review mode: rendered / source-only
Checks performed:
Findings by severity:
Fixes made:
Accepted or deferred findings:
Residual verification gaps:
```

## Exit Gate

No unresolved BLOCKER findings remain. MAJOR findings are fixed or explicitly
accepted. Required checks pass or their unavailability is clearly reported.
