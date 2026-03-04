# KARM Landing Page

## Current State
A galaxy-themed dark landing page for the KARM productivity app. Features: installs counter (base 56), hero section with ring timer + focus lines, psychological hit section, features section, analytics mock section, ASCII KARM text, cult line, social proof, and final CTA. The galaxy theme uses deep space blues (#030514 base), static star field, galaxy glow effects, and rgba(100,150,255) blue accent colors throughout.

## Requested Changes (Diff)

### Add
- `FloatingComments` component: animated floating comment bubbles that hover/float across the screen in a TikTok-style live-comment fashion
- Each comment bubble shows the username (with @ prefix, styled in galaxy blue accent) and the comment text
- Comments use the same galaxy glass aesthetic (dark semi-transparent backgrounds, blue border accents, backdrop blur)
- Comments animate upward and fade out, staggered so they feel organic and continuous
- Comments data: all provided usernames and their comments, cycling through them
- Counter base value updated from 56 → 62

### Modify
- `useInstallCount.ts`: Change all base value references from 56 → 62
- `LandingPage.tsx`: Add `FloatingComments` component render
- `InstallsCounterBar.tsx`: Update comment about base value

### Remove
- Nothing removed

## Implementation Plan
1. Update all base value references in `useInstallCount.ts` from 56 to 62
2. Create `src/components/landing/effects/FloatingComments.tsx` with:
   - All provided comment/username data as a static array
   - Each comment animates upward from a random x position along the bottom/middle of the screen
   - Uses CSS keyframe animations via inline styles for smooth float-up + fade
   - Comments stagger their start times so multiple are visible at once
   - Galaxy glass styling: `rgba(5, 10, 30, 0.75)` background, `rgba(100,150,255,0.2)` border, backdrop-blur
   - Username in `rgba(150,200,255,0.9)` blue, comment text in `rgba(220,235,255,0.85)` white
   - Fixed position, pointer-events none, z-index above background but below nav
   - Cycles through all comments on a timer, spawning new ones continuously
3. Add `<FloatingComments />` to `LandingPage.tsx`
4. Add required CSS keyframe for float-up animation to `index.css`
