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
