# Discovery Workflow

## Goal

Turn incomplete request and project context into a normalized design input. Run
this before shaping a new substantial surface or when existing memory is stale.

## Inputs

- current user request
- `src/PRODUCT.md`
- `src/DESIGN.md`
- `src/.design/BRIEF.md`
- `src/.design/REFERENCES.md`
- existing application, design system, and relevant analytics or research

## Process

1. **Product:** state what is being designed and the real capability it exposes.
2. **Audience:** identify primary users, context, expertise, and access needs.
3. **Page/task type:** classify using the Design Director categories.
4. **Business goal:** name the behavior or outcome the surface should support.
5. **Existing design system:** inventory relevant tokens, components, patterns,
   and constraints before proposing additions.
6. **Brand:** extract voice, visual character, promises, and prohibited claims.
7. **Constraints:** record technical, content, legal, performance, timeline,
   localization, browser, and accessibility constraints.
8. **References:** normalize each reference into specific useful dimensions.
9. **Anti-references:** name what must not be copied and why.
10. Separate facts, explicit decisions, assumptions, and open questions.

Ask a question only when the answer would materially change structure, engine
routing, product behavior, or visual direction. Otherwise record the assumption.

## Output

Update `src/.design/BRIEF.md` with:

```text
Task:
Classification:
Audience:
Primary goal:
Required content and functionality:
Existing system to preserve:
Brand direction:
Constraints:
References and anti-references:
Assumptions:
Open questions:
Success criteria:
```

Add durable product facts to `src/PRODUCT.md`, not only the task brief.

## Exit Gate

Discovery is complete when the primary user, task, required behavior, success
condition, constraints, and preserved conventions are clear enough to shape.
