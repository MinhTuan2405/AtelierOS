# Design Decisions

This is an append-only record of durable design choices. Do not rewrite old
entries when a decision changes; append a new entry that supersedes it.

## Starter Baseline

**Date:** 2026-08-13

**Decision:** Keep the starter interface intentionally neutral and lightweight.

**Reason:** New projects should establish their own product and design language
instead of inheriting the AtelierOS product website's identity.

**Alternatives rejected:** Shipping the product website as starter content would
mix toolkit documentation with downstream product requirements.

**Impact:** Replace the starter screen after defining `PRODUCT.md`, `DESIGN.md`,
and the current brief.

## Product-Family Baseline

**Date:** 2026-08-13

**Decision:** The starter screen uses the same technical-atelier visual language
as the AtelierOS product website while retaining starter-specific content.

**Reason:** The toolkit and starter should feel like one product family during
onboarding, without copying the product website's routes or promotional content.

**Alternatives rejected:** A generic green starter diverged from the established
AtelierOS identity and made the two branches feel unrelated.

**Impact:** The starter shares typography, neutral and orange tokens, drafting
geometry, sharp controls, responsive transformations, and light/dark behavior.

## Browser Icon

**Date:** 2026-08-13

**Decision:** Use a simplified vector version of the AtelierOS registration mark
as the shared browser favicon.

**Reason:** Crisp geometry, reduced whitespace, and flat colors preserve the
source mark at small browser-tab sizes better than the large raster artwork.

**Alternatives rejected:** Using the source PNG directly would retain soft edges
and scale the mark too small within its canvas.

**Impact:** Keep `/favicon.svg` synchronized between the starter and product
website branches.
