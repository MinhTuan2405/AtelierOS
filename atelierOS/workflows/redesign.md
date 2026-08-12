# Redesign Workflow

## Goal

Improve an existing surface without erasing product behavior, brand equity,
known conventions, or useful design-system investment.

## Process

1. **Audit the existing UI.** Capture hierarchy, task flow, components, tokens,
   responsive behavior, accessibility, content, and measurable problems.
2. **Classify evidence.** Separate defects, subjective preferences, constraints,
   and intentional conventions.
3. **Define preservation boundaries.** List functionality, data, navigation,
   content, analytics, brand assets, and component contracts that must remain.
4. **Set redesign outcomes.** Turn broad goals such as "modern" into observable
   improvements in comprehension, task completion, consistency, or expression.
5. **Discover selectively.** Fill only material gaps in audience, goal,
   constraints, references, and anti-references.
6. **Explore with Taste.** When installed and appropriate, generate genuinely
   distinct visual routes grounded in the preservation boundaries.
7. **Select one direction.** Resolve conflicts using `PRIORITY.md`; do not blend
   routes to avoid making a choice.
8. **Shape with Impeccable.** Rebuild hierarchy, layout, states, and responsive
   structure while mapping to existing components wherever practical.
9. **Implement incrementally.** Preserve tested behavior and avoid a broad
   rewrite when targeted changes can deliver the intended outcome.
10. **Critique and polish.** Review with the Design Reviewer, Taste anti-pattern
    guidance where relevant, and Impeccable refinement where available.
11. **Audit.** Verify functionality, responsiveness, accessibility, consistency,
    and implementation quality.
12. Record durable changes and migration implications in design memory.

## Required Output

Before implementation, state:

```text
Problems being solved:
Evidence:
Must preserve:
May change:
Selected direction:
Rejected directions:
Migration and regression risks:
```

## Exit Gate

The redesigned surface solves the stated problems, preserves required behavior,
fits the product system, and has no unresolved BLOCKER or MAJOR findings.
