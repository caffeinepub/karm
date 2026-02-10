# Specification

## Summary
**Goal:** Remove the CultLineSection landing-page image so the section shows only the heading and subtext, and clean up the now-unused image asset reference.

**Planned changes:**
- Update CultLineSection to stop rendering the screenshot/card image (no `<img>` and no image placeholder/wrapper that leaves extra whitespace).
- Remove the static asset reference to `/assets/generated/karm-whatsapp-card.dim_736x1472.jpg` from frontend code.
- If the image file is unused across the app, delete `frontend/public/assets/generated/karm-whatsapp-card.dim_736x1472.jpg` (or equivalent public assets path) and verify the app builds without missing-asset errors.

**User-visible outcome:** The CultLineSection displays a centered, balanced heading and subtext only (no image), and the app loads/builds cleanly without referencing or requiring the removed asset.
