# Art Direction Workflow

## Goal

Choose one defensible visual concept that expresses the product and audience.
Taste should be heavily involved for marketing, portfolio, editorial, and other
identity-sensitive work when installed.

## Inputs

- normalized brief from discovery
- selected profile
- product and design memory
- references and anti-references
- existing visual assets and design tokens
- `atelierOS/rules/anti-patterns.md` and accessibility constraints

## Process

1. Name the communication problem, desired response, and content that must lead.
2. Generate a small number of genuinely distinct concepts, not minor style
   variants. Tie each to product context rather than trend labels.
3. Evaluate concepts against usability, brand fit, implementation feasibility,
   responsive behavior, accessibility, and differentiation.
4. Select one dominant concept. Do not blend rejected concepts by default.
5. Define the typography strategy: role, contrast, measure, hierarchy, and
   fallback behavior.
6. Define composition: grid, alignment, focal hierarchy, rhythm, image behavior,
   and where the layout intentionally breaks its pattern.
7. Set intended density for key regions and explain any changes in pace.
8. Define motion by purpose, trigger, duration character, and reduced-motion
   behavior. Omit motion that has no explanatory or brand role.
9. Define color behavior by semantic, structural, and expressive roles without
   inventing final tokens prematurely.
10. Record visual references by relevant dimension and explicit non-copy rules.
11. Name two or three distinctive decisions that make the direction specific.
12. Run an early anti-pattern check against generic AI composition.

## Engine Roles

- **Taste:** visual concepts, compositional distinctiveness, typography voice,
  anti-generic challenge, and pre-flight criticism.
- **Impeccable:** feasibility, hierarchy clarity, structural coherence, and
  refinement constraints.

If Taste is unavailable, follow the same process using project evidence and the
selected profile. Do not pretend engine output was produced.

## Output

Update the applicable sections of `src/DESIGN.md` and task brief with:

```text
Concept:
Intended response:
Typography strategy:
Composition and grid:
Density:
Color behavior:
Motion behavior:
Reference dimensions:
Distinctive decisions:
Rejected directions and reasons:
```

Append the selected direction to `src/.design/DECISIONS.md` when durable.

## Exit Gate

One direction is selected, its constraints are explicit, and it can guide shape
and implementation without aesthetic guesswork.
