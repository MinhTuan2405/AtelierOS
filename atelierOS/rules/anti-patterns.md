# Frontend Anti-Patterns

These are diagnostic signals, not blanket bans. A technique is acceptable when
it serves product meaning, reinforces the chosen direction, and remains usable.

| Pattern | Why it fails | When it can be appropriate |
| --- | --- | --- |
| Card soup | Every item gets an equal container, flattening hierarchy and adding visual noise. | Distinct, comparable objects genuinely need boundaries, actions, or independent states. |
| Unnecessary gradients | Gradients become filler instead of communicating depth, focus, brand, or state. | A restrained gradient has a defined role in the brand, lighting concept, data scale, or focal hierarchy. |
| Random glassmorphism | Transparency harms contrast and creates an unrelated visual system. | Layering over meaningful imagery or spatial UI benefits from translucency and contrast is verified. |
| Excessive pills | Repeated capsules make controls, labels, and decoration indistinguishable. | Compact tags, filters, statuses, or segmented controls need the shape and use it consistently. |
| Excessive rounded containers | Nesting rounded boxes weakens structure and wastes space. | Touch targets or a deliberately soft product language call for a documented radius system. |
| Repeated three-column feature sections | Formulaic repetition erases narrative pacing and content priority. | Three peer concepts are genuinely comparable and the layout adapts well at smaller widths. |
| Fake dashboards | Decorative charts and controls imply nonexistent behavior and distract from the real product. | The data and interactions are representative, labeled as examples, and support the product story. |
| Decorative metrics without meaning | Large numbers create false authority without context, source, or decision value. | A real, understandable metric supports trust or a user decision and includes sufficient context. |
| Inconsistent radius | Arbitrary corner values make components feel unrelated. | Deliberate contrast separates component families and is encoded in design tokens. |
| Inconsistent spacing | One-off gaps destroy rhythm and make maintenance harder. | Optical correction is necessary and documented or locally self-evident. |
| Huge hero whitespace | The primary message or evidence falls below the fold without adding impact. | A sparse composition is the explicit concept and still presents essential context on small laptops. |
| Over-animation | Constant motion competes for attention, delays tasks, and ignores user preference. | Motion clarifies state, causality, navigation, or narrative and respects reduced-motion settings. |
| Arbitrary shadows | Unsystematic elevation creates muddy hierarchy and visual noise. | Shadows communicate an intentional elevation model or separate content from a complex background. |
| Meaningless badges | Labels such as "New" or "AI-powered" add clutter without useful distinction. | A badge communicates actionable status, category, recency, or trust information. |
| Excessive icon usage | Icons replace clear language or decorate every line without improving scanning. | Familiar symbols save space, reinforce labels, or support repeated high-frequency actions. |
| Weak typography hierarchy | Similar size, weight, and measure make content difficult to scan. | A quiet hierarchy is intentional and still distinguishable through spacing, placement, and contrast. |
| Generic SaaS composition | Centered headline, gradient orb, logo strip, three cards, and repeated CTA feel interchangeable. | Individual elements are justified by content and transformed by a product-specific concept and composition. |

## Review Questions

- Does each container, effect, icon, label, and animation have a job?
- Can hierarchy be improved by removing decoration rather than adding more?
- Does the composition express this product, or could its copy be swapped with
  any competitor?
- Are repeated patterns driven by repeated content, or by a template?
- Would removing the technique reduce usability, meaning, or the intended brand
  expression? If not, remove it.
