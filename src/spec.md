# Specification

## Summary
**Goal:** Add a new monochrome/glass “analytics-style” stats mockup block to the landing page, placed immediately above the existing ASCII “KARM” section, matching the site’s current visual style.

**Planned changes:**
- Create a new landing-page UI block that recreates the feel of the provided React Native `AnalyticsScreen` (header + central deck/cards layout) using existing React + Tailwind patterns and the site’s glass styling.
- Display hard-coded stats in the new block: Level 23, Karm 82800 (computed from 23*3600), Habits 4, Challenges 24, with all labels in English.
- Add a subtle blended background/atmosphere for the block using existing site patterns (optionally including snow dots) and ensure any motion respects reduced-motion preferences.
- Insert the new analytics block into the landing page composition directly before the ASCII KARM renderer without reordering/removing other sections.

**User-visible outcome:** On the landing page, users see a styled analytics/mock stats section (Level, Karm, Habits, Challenges) immediately above the ASCII KARM section, visually consistent with the rest of the site.
