# Specification

## Summary
**Goal:** Update the landing page by inserting a new Three.js ASCII “KARM” section above Social Proof and adding the provided Cult Line image above the Cult Line heading.

**Planned changes:**
- Add a new Three.js-based ASCIIText React component (ported from the provided snippet) and render it as a full-width, responsive landing section with text "KARM" using `enableWaves={false}` and `asciiFontSize={7}`, placed above the Social Proof section (above the “Used during real study sessions” line).
- Ensure the ASCIIText component properly cleans up resources on unmount (animation loop and event listeners) and does not overflow horizontally on mobile/desktop.
- Insert the user-provided image as a static frontend asset into the CultLineSection area, positioned above the heading and styled to match the dark landing aesthetic (centered, responsive, sensible max-width/spacing).
- Ensure the Cult Line heading copy matches exactly: "Built for people who are done negotiating with themselves." and keep user-facing text in English.

**User-visible outcome:** The landing page shows a new animated ASCII “KARM” section above Social Proof, and the Cult Line section displays the provided image above the “Built for people who are done negotiating with themselves.” heading.
