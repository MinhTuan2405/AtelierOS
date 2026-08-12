# DesignKernel Constitution

These principles are permanent defaults for DesignKernel-owned orchestration.
They apply across profiles, workflows, agents, and replaceable design engines.

## Principles

1. **Accessibility outranks decorative aesthetics.** Visual expression must not
   compromise perceivability, operability, comprehension, or robust semantics.
2. **Preserve functionality unless explicitly requested otherwise.** A visual
   change is not permission to remove behavior, states, content, or user paths.
3. **Reuse existing design tokens before creating new ones.** Extend tokens only
   when the existing system cannot express a justified recurring need.
4. **Avoid accidental parallel design systems.** New components, values, and
   patterns must fit the established language or intentionally replace it.
5. **Use one dominant visual direction per screen.** Supporting variation is
   allowed; competing concepts and arbitrary blends are not.
6. **Make and document intentional decisions.** Record durable choices and their
   reasons in project design memory.
7. **Responsive behavior is mandatory.** Every implementation must define how
   content, hierarchy, controls, and density adapt rather than merely shrink.
8. **Use semantic HTML where appropriate.** Prefer native elements and behavior;
   add ARIA only when native semantics are insufficient.
9. **Maintainability matters.** Favor clear component boundaries, reusable
   tokens, understandable styling, and the smallest correct change.
10. **Avoid design-for-design's-sake.** Decoration, motion, novelty, and visual
    complexity need a product, communication, or brand purpose.
11. **Do not introduce dependencies without clear value.** Consider platform
    capabilities and existing packages before adding maintenance and runtime
    cost.

## Enforcement

- Profiles and workflows specialize these principles but cannot silently
  weaken them.
- External engines advise DesignKernel; they do not own project policy.
- Deviations require an explicit higher-priority instruction and should be
  recorded when they are durable.
- Review substantial UI work against this constitution before completion.
