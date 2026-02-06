# Specification

## Summary
**Goal:** Remove all landing page imagery and the in-UI admin/config panel, and hardcode a single fixed Google Drive APK download link across the app.

**Planned changes:**
- Remove the AdminPanel UI/component from all pages/routes so no configuration or floating editor is visible to end users.
- Update all APK download CTAs (Hero and Final CTA) to navigate to the single fixed Google Drive URL: https://drive.google.com/file/d/1hFHZKQIsXB-80s6kiqhzfsKxi3s24qA7/view?usp=drive_link
- Remove all landing page images/mockups/screenshots (including any `<img>` usage or CSS background images) while keeping the ultra-minimal black, typography-driven aesthetic.
- Update any customization/config documentation or modules to remove Admin Panel/localStorage/image-replacement references and document the fixed APK link in English.

**User-visible outcome:** Users see a fully minimal, text-focused landing page with no images and no admin/config UI; all download buttons take them to the same fixed Google Drive APK link.
