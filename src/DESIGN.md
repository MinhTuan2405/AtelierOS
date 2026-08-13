# Design System Memory

> Document the established visual and interaction language. Prefer named tokens
> and observable rules over mood adjectives.

## Visual Direction

Starter baseline: technical atelier, matching the AtelierOS product website.
Visible drafting lines, registration marks, editorial type scale, and precise
technical labels make the starter feel part of the same system. Downstream
projects should replace this baseline when their own product direction is known.

## Color System

Use `canvas`, `surface`, `ink`, `ink-soft`, `line`, and `signal` semantic roles.
The starter uses warm neutrals with orange as the single expressive signal and
follows system light/dark preference while maintaining WCAG AA contrast.

## Typography

Manrope Variable is used for display and reading. JetBrains Mono Variable is
reserved for technical labels, commands, statuses, and file names. Display text
uses tight tracking and body copy remains under a readable measure.

## Spacing

[Spacing tokens, rhythm, density, and allowed optical exceptions.]

## Radii

The baseline is predominantly sharp. Interactive controls use a restrained 4px
radius for focus and touch affordance.

## Shadows

Do not use decorative shadows. Use lines, fields, and spacing for hierarchy.

## Grid and Layout

Use a maximum 1440px canvas, fluid gutters, and a 12-column desktop grid.
Asymmetric splits collapse to one column below 900px.

## Components

[Established primitives, variants, composition rules, and known gaps.]

## Interaction

[Input behavior, focus treatment, feedback, state conventions, and keyboard
patterns.]

## Motion

Use short state transitions only. Respect `prefers-reduced-motion` and avoid
ambient or layout motion.

## Responsive Rules

The hero and setup regions collapse to one column below 900px. Actions become
full-width and the status ledger becomes vertical below 600px. Support a minimum
width of 320px and verify reflow at 200% zoom.

## Accessibility Requirements

- Target WCAG 2.2 AA unless a stricter requirement is recorded.
- [Project-specific assistive technology, contrast, localization, zoom, or input
  requirements]
