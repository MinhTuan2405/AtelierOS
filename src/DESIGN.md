# Design System Memory

## Visual Direction

Technical atelier: a working systems manual laid over a drafting board. The site
uses visible grid lines, route diagrams, registration marks, and editorial scale
to make orchestration tangible without imitating an IDE or manufacturing a fake
product screenshot. Interfaces should feel authored, exact, and useful.

## Color System

Use semantic CSS custom properties. `canvas`, `surface`, and `surface-strong`
form one neutral theme; `ink`, `ink-muted`, and `line` establish hierarchy;
`signal` is the only expressive accent and is reserved for current state,
primary action, and routing emphasis. Follow system light/dark preference while
maintaining WCAG AA contrast in both modes.

## Typography

Manrope Variable is the display and reading family. JetBrains Mono Variable is
used for commands, route labels, versions, and technical metadata. Display type
uses tight tracking and a bounded fluid scale; body copy stays under 68ch with
generous line height.

## Spacing

Use a 4px base with named steps from 8px through 128px. Section spacing is fluid
and content-led. Related technical metadata stays compact; narrative regions
receive larger separation. Optical offsets are allowed only for display type and
diagram alignment.

## Radii

The system is predominantly sharp. Interactive controls use a restrained 4px
radius for focus and touch affordance; diagrams, panels, and content regions stay
square. Status markers may be circular because their geometry communicates nodes.

## Shadows

No decorative drop-shadow system. Hierarchy comes from lines, color fields,
spacing, and occasional 1px inset highlights in dark mode.

## Grid and Layout

Maximum canvas width is 1440px with fluid gutters. Desktop uses a 12-column grid
and asymmetric 5/7 or 7/5 compositions. Documentation uses a narrow sticky index
beside a readable article. Below 768px, every split becomes one column in DOM
order and decorative drafting coordinates are reduced.

## Components

Core primitives are `SiteHeader`, `SiteFooter`, `PageIntro`, `CodeBlock`,
`RouteComposer`, and semantic route/page sections. Buttons have primary,
secondary, and text-link treatments. Panels are used only for independent tools
or diagrams, never as default wrappers for ordinary copy.

## Interaction

Links and buttons use visible 2px signal-color focus outlines with offset. The
mobile menu uses native disclosure behavior. The route composer uses labeled
native selects and announces copy feedback with a polite live region. Hash route
changes move focus to the page heading.

## Motion

Motion explains route sequence and page arrival. Use short opacity/transform
reveals with a precise ease; do not animate layout dimensions or run ambient
loops. Disable all nonessential transitions and smooth behavior under
`prefers-reduced-motion`.

## Responsive Rules

Primary navigation remains one line from 860px upward and becomes a disclosure
below it. Hero copy and the route diagram stack below 900px. Documentation index
becomes inline below 960px. Multi-cell system maps collapse to one column below
720px. Verify at 320px, 768px, 1280px, and the 1440px maximum.

## Accessibility Requirements

- Target WCAG 2.2 AA unless a stricter requirement is recorded.
- Preserve semantic landmarks, heading order, visible keyboard focus, 44px
  primary touch targets, reduced motion, and usable reflow at 200% zoom.
