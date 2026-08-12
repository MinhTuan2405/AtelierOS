# Responsive Design Rules

Responsive design preserves task priority and comprehension across available
space. It is not a desktop layout scaled down.

## Start With Content and Constraints

- Identify the primary task, critical content, minimum useful control sizes,
  long strings, localization risk, and dense-data requirements.
- Choose breakpoints where the composition fails, not from a device-name list.
- Prefer fluid sizing, intrinsic layout, wrapping, and container-aware behavior
  before adding media queries.
- Define a readable content measure and intentional maximum widths; do not let
  text or controls stretch merely because space exists.

## Adapt Hierarchy

- Preserve critical content and actions at every supported width.
- Reorder only when visual and DOM reading order remain understandable.
- Collapse or disclose secondary information intentionally; never hide product
  requirements to make a screenshot cleaner.
- Convert multi-column layouts according to content relationships, not by
  blindly stacking every region.
- For data-heavy screens, choose a documented strategy: responsive columns,
  horizontal scrolling with cues, prioritized fields, or an alternate detail
  view.

## Interaction

- Do not depend on hover. Provide touch and keyboard equivalents.
- Keep controls reachable, labels visible, and targets large enough on narrow
  screens.
- Avoid sticky regions that consume most of the viewport or trap content.
- Account for virtual keyboards, safe areas, browser chrome, and dynamic
  viewport height where relevant.

## Media and Type

- Reserve image dimensions to avoid layout shift and select appropriate source
  sizes where supported.
- Crop intentionally with focal points; never hide essential information in a
  background image.
- Use fluid typography within bounded ranges. Verify headings with realistic
  copy, long words, and zoom.

## Verification Matrix

At minimum inspect:

- narrow phone width around 320-375 CSS pixels
- wider phone or small tablet around 600-768 CSS pixels
- laptop width around 1024-1366 CSS pixels
- wide layout at the project's intended maximum
- 200% text zoom or equivalent reflow

Check portrait and landscape when the product is likely to be used in both.
Record intentional exceptions in `src/DESIGN.md`.
