# RecipeWeb — Modular File Structure

Refactored from a single 3,240-line monolithic JSX file into ~20 focused modules.
Base64 images (~250 KB total) have been stripped and replaced with URL placeholders.

---

## Swapping the images

Edit `src/assets.js` and replace the three placeholder strings:

```js
// Option A: put images in /public/images/ (Vite/Next/CRA all support this)
export const KITCHEN_IMG = "/images/kitchen.jpg";
export const NANA_IMG    = "/images/nana.png";
export const MAP_IMG     = "/images/world-map.jpg";

// Option B: import via bundler
import kitchenUrl from "./kitchen.jpg";
export const KITCHEN_IMG = kitchenUrl;

// Option C: re-paste your base64 strings
export const KITCHEN_IMG = "data:image/jpeg;base64,/9j/4AAQ...";
```

---

## Directory layout

```
RecipeWeb.jsx                   ← root component (default export, entry point)
src/
  assets.js                     ← image URLs (replaces the 3 base64 blobs)
  constants/
    theme.js                    ← P — color palette object
    config.js                   ← FONTS, NUDGES, TUTORIAL, EMOJIS, WCOLS
  data/
    recipes.js                  ← DEMO_RECIPES (8 recipes, ~290 lines)
    techniques.js               ← TECHNIQUES + TECHNIQUE_META + TECHNIQUE_CATS
                                   + STEP_TECHNIQUES + DIFF_LABELS + fmtTime
    worldCuisines.js            ← WORLD_CUISINES + CONTINENT_ZONES + CS_INFO + ZONES
  logic/
    scoring.js                  ← scoreRecipes(), applyNudge()
  components/
    primitives.jsx              ← Card, SL, SH, Sel, Nana, Tag
    WormholeCanvas.jsx          ← canvas animation for fridge transition
    FridgeDoorOverlay.jsx       ← 3-D door swing animation
    TutorialBox.jsx             ← Nana's speech-bubble tutorial overlay
  screens/
    KitchenScreen.jsx           ← main kitchen with clickable zones
    FridgeScreen.jsx            ← ingredient input + preferences
    PickerScreen.jsx            ← matched recipe cards
    RecipeScreen.jsx            ← full recipe view + nudge panel
    SavedScreen.jsx             ← saved recipe book
    WorldCuisineScreen.jsx      ← SVG world map + RegionListView + CuisineDetailView
    TechniqueLibraryScreen.jsx  ← browse/filter/detail view for cooking techniques
    ComingSoon.jsx              ← placeholder screen for spices + season
```

---

## Import graph (simplified)

```
RecipeWeb.jsx
├── src/constants/config.js        (FONTS, TUTORIAL)
├── src/logic/scoring.js
│   └── src/data/recipes.js
├── src/components/WormholeCanvas.jsx
│   └── src/constants/config.js   (EMOJIS, WCOLS)
├── src/screens/KitchenScreen.jsx
│   ├── src/assets.js             (KITCHEN_IMG)
│   ├── src/data/worldCuisines.js (ZONES)
│   ├── src/components/FridgeDoorOverlay.jsx
│   └── src/components/TutorialBox.jsx
│       ├── src/constants/theme.js
│       └── src/components/primitives.jsx (Nana)
├── src/screens/FridgeScreen.jsx
│   └── src/components/primitives.jsx (Card, SL, Sel, Nana)
├── src/screens/PickerScreen.jsx
│   └── src/components/primitives.jsx (Nana, Tag)
├── src/screens/RecipeScreen.jsx
│   ├── src/constants/config.js   (NUDGES)
│   ├── src/data/techniques.js    (TECHNIQUES, STEP_TECHNIQUES)
│   └── src/components/primitives.jsx (Card, SL, SH, Nana)
├── src/screens/SavedScreen.jsx
│   └── src/components/primitives.jsx (Nana)
├── src/screens/WorldCuisineScreen.jsx
│   ├── src/assets.js             (MAP_IMG)
│   └── src/data/worldCuisines.js
├── src/screens/TechniqueLibraryScreen.jsx
│   ├── src/data/techniques.js
│   └── src/components/primitives.jsx (Card, SL, SH, Nana)
└── src/screens/ComingSoon.jsx
    ├── src/data/worldCuisines.js  (CS_INFO)
    └── src/components/primitives.jsx (Nana)
```

---

## File sizes (approx)

| File | Lines |
|------|-------|
| `src/data/techniques.js` | 1,597 |
| `src/data/recipes.js` | 295 |
| `src/screens/TechniqueLibraryScreen.jsx` | 268 |
| `src/screens/WorldCuisineScreen.jsx` | 227 |
| `src/data/worldCuisines.js` | 233 |
| `RecipeWeb.jsx` | ~110 |
| `src/screens/RecipeScreen.jsx` | ~115 |
| `src/screens/FridgeScreen.jsx` | ~90 |
| All other files | < 80 each |
