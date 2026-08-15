# Design Decisions

This is an append-only record of durable design choices. Do not rewrite old
entries when a decision changes; append a new entry that supersedes it.

## 2026-08-13: Technical Atelier Visual System

**Decision:** Use an editorial systems-manual language with sharp geometry,
route diagrams, repository structures, Manrope display type, JetBrains Mono
annotations, neutral adaptive surfaces, and one orange signal color.

**Reason:** The visual language makes AtelierOS's real orchestration model the
primary artifact and avoids category-interchangeable AI SaaS imagery.

**Alternatives rejected:** Glowing dark-tech UI, a literal IDE imitation, and a
generic card-based SaaS page because each would obscure the repository-owned
control system or imply nonexistent product telemetry.

**Impact:** Public website typography, tokens, diagrams, navigation, docs,
changelog, demo, light/dark modes, and future marketing surfaces.

## 2026-08-13: Static Hash Routing

**Decision:** Serve Home, Docs, Changelog, and Live Demo through accessible hash
routes with relative production assets.

**Reason:** The website must work from GitHub Pages and other static subdirectory
hosts without server rewrite configuration while retaining direct destinations.

**Alternatives rejected:** Browser-history routing because it requires host
fallback rules, and separate HTML entries because they duplicate the application
shell and increase maintenance.

**Impact:** Navigation URLs, route focus management, documentation anchors,
production deployment, and automated routing tests.

## 2026-08-13: Demo Realism Boundary

**Decision:** The Live Demo composes and copies route contracts from real
profiles, workflows, and engine roles. It does not claim to execute agents.

**Reason:** A functional route composer demonstrates the toolkit's core value
without fabricating runtime AI behavior or unsupported metrics.

**Alternatives rejected:** A fake terminal session and decorative dashboard
because both would present simulated output as product capability.

**Impact:** Demo content model, UI states, copy, and future integration work.

## 2026-08-13: Browser Icon

**Decision:** Use a simplified vector version of the AtelierOS registration mark
as the shared browser favicon.

**Reason:** Crisp geometry, reduced whitespace, and flat colors preserve the
source mark at small browser-tab sizes better than the large raster artwork.

**Alternatives rejected:** Using the source PNG directly would retain soft edges
and scale the mark too small within its canvas.

**Impact:** The product website and starter share `/favicon.svg` as a recognizable
browser-level identity.

## 2026-08-13: Motion follows the route

Website motion uses a single authored hero sequence that drafts the route diagram
in processing order. On pointer-capable devices, the diagram responds with
depth-weighted node movement and a drafting reticle so the system map feels
inspectable. Supporting content reveals once at the viewport edge in small
semantic groups, while interactive route changes receive a short local
confirmation. Content remains visible without JavaScript or IntersectionObserver,
and spatial motion is removed when `prefers-reduced-motion` is enabled.

This keeps motion specific to AtelierOS orchestration, avoids ambient loops and
layout animation, and requires no runtime animation dependency.

The site header remains fixed for persistent route access. It enters once from
the viewport edge and transitions from 72px to 60px after the page begins to
scroll, with layout space reserved so content does not jump.

Primary navigation keeps the fixed header spatially stable and uses one short
content entrance after each hash-route update. Browser snapshot transitions are
avoided because they duplicate page motion and delay route feedback.

## 2026-08-15: The signal rail becomes the website structure

**Decision:** Supersede the prior scroll-shrinking header and isolated hero
diagram with a fixed 72px desktop and 64px mobile header plus a continuous
signal-rail composition. The route blueprint reacts to pointer position, drafts
its processing sequence once on arrival, and becomes a linear process on narrow
screens. Supporting content uses varied editorial layouts and one-time reveals.

**Reason:** The orchestration route is AtelierOS's unique product mechanism. It
should organize the full narrative rather than appear as one decorative diagram.
Removing scroll-driven header state also avoids continuous runtime work and keeps
navigation spatially stable.

**Alternatives rejected:** Restoring the shrinking header would add motion that
does not explain state. Ambient loops, fake terminal output, and generic product
screens would either distract from the route or imply unsupported capability.

**Impact:** Home-page hierarchy, route animation, header behavior, responsive
process layouts, supporting page intros, and future marketing sections.
