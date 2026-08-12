# Accessibility Rules

Accessibility is a design and implementation requirement, not a final optional
check. Target WCAG 2.2 AA unless the project records a stricter standard.

## Structure and Semantics

- Use semantic landmarks, headings in a logical outline, lists for list content,
  and native buttons and links for their intended actions.
- Give every form control a persistent accessible name and associate validation
  and help text programmatically.
- Use tables only for tabular relationships and provide useful headers.
- Use ARIA only when native semantics cannot express the interaction. Test
  custom widgets against established keyboard patterns.
- Set meaningful page titles, document language, and descriptive link text.

## Keyboard and Focus

- Every interactive control must be reachable and operable by keyboard.
- Preserve a visible, high-contrast focus indicator; do not remove outlines
  without an equivalent replacement.
- Keep focus order aligned with reading and visual order.
- Move and restore focus intentionally for dialogs, menus, route changes, and
  dynamically revealed workflows.
- Provide a skip path where repeated navigation makes it useful.

## Perception

- Meet contrast requirements for text, controls, focus states, and meaningful
  graphics. Do not rely on color alone to communicate status.
- Provide useful alternative text for informative images and empty alternatives
  for decorative images.
- Caption or transcribe meaningful media when used.
- Support text zoom and reflow without clipped content or loss of action.
- Keep touch targets comfortably operable; use at least 24 by 24 CSS pixels as
  a floor and prefer 44 by 44 for primary touch controls.

## Motion and Time

- Respect `prefers-reduced-motion`; remove nonessential movement and avoid
  forced smooth scrolling.
- Avoid flashing content and unnecessary autoplay.
- Give users control over time limits, rotating content, or interrupted tasks
  where applicable.

## States and Feedback

- Define accessible loading, empty, error, validation, disabled, and success
  states. Announce asynchronous changes when they are not otherwise apparent.
- Keep disabled actions understandable; explain unmet prerequisites near the
  action rather than relying on a disabled appearance alone.
- Ensure hover-only content is also available to keyboard and touch users.

## Verification

Use automated checks when available, then perform keyboard and screen-reader
smoke tests for critical flows. Automation does not validate language clarity,
focus logic, alternative text quality, or the full interaction model.
