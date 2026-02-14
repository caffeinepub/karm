# Landing Page Customization Guide

## APK Download Link

The APK download link is centralized in `frontend/src/components/landing/download.ts`.

**Current link:** `https://expo.dev/artifacts/eas/mnS2rupKHoWV5Fa1RQ3uZ.apk`

All download buttons ("Download KARM" in Hero and "Enter KARM" in Final CTA) use the shared `downloadAPK()` function, which opens this link in a new tab with security attributes (`noopener,noreferrer`).

To update the APK link, edit the `APK_DOWNLOAD_URL` constant in `download.ts`.

## Install Counter

The install counter is displayed at the top of the page and persists across sessions via the backend. It starts at a base value of 24 and increments each time a user clicks any download button.

**Implementation:**
- `useInstallCount` hook manages the counter state with React Query
- `InstallsCounterBar` component displays the count at the top of the page
- Both download buttons trigger the increment via optimistic updates

## Landing Page Structure

The landing page follows a cinematic scroll narrative with these sections in order:

1. **Hero** - Fullscreen wordmark with FaultyTerminal WebGL background and primary CTA
2. **Psychological Hit** - Sequential fade-in of three psychological trigger lines
3. **What It Does** - Three-column feature showcase (text only)
4. **ASCII KARM** - Three.js ASCII text renderer with WebGL shaders
5. **Cult Line** - Centered manifesto targeting core audience
6. **Social Proof** - Minimal raw testimonials without metrics
7. **Final CTA** - Black minimal screen with "Enter KARM" button and footer

## Copy Customization

All landing page copy is centralized in `frontend/src/components/landing/landingCopy.ts`.

Edit this file to update headlines, taglines, feature descriptions, and social proof content.

## Background Effects

### Hero Background (FaultyTerminal)
The hero section uses a custom WebGL terminal effect with glitch, scanline, and mouse-reactive animations.

**Customization options** (in `HeroSection.tsx`):
- `scale` - Overall zoom level
- `timeScale` - Animation speed
- `scanlineIntensity` - Scanline visibility (0-1)
- `glitchAmount` - Glitch effect strength
- `tint` - Color tint (hex color)
- `brightness` - Overall brightness (0-1)
- `mouseReact` - Enable/disable mouse interaction
- `mouseStrength` - Mouse effect intensity

### Cursor Glow
A subtle monochrome cursor glow effect tracks mouse position across the page. It automatically disables on touch devices.

To disable, remove `<CursorGlow />` from `LandingPage.tsx`.

## Styling

The landing page uses a pure black background with OKLCH monochrome tokens defined in `frontend/src/index.css`.

**Key design utilities:**
- `.wordmark-glow` - Text glow effect for the KARM wordmark
- `.premium-cta` - Glass morphism button style with glow pulse animation
- Custom float animation for subtle motion effects

Customize colors, shadows, and animations in `index.css` and `tailwind.config.js`.
