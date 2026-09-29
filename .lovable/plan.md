# e6health Dashboard Mirror

## Goal
Rebuild the referenced patient dashboard at the app’s home page, matching its dark clinical look, visible content, information density, and overall composition. This will be a polished frontend recreation rather than a pixel-for-pixel copy of proprietary branding.

## What will be built
- A responsive app shell with the e6health-style left navigation, compact top bar, user identity, and notification control.
- The same visible dashboard content and values from the reference: longevity journey, score, protocol tasks, wearable data, supplement stack, biomarkers, trend chart, nutrition plan, lab tests, delivery panel, and daily wellness check-in.
- Faithful visual treatment: deep navy surfaces, teal highlights, compact cards, serif section headings, restrained borders, and dense desktop spacing.
- Mobile behavior with a collapsible navigation drawer and stacked dashboard sections while preserving content priority.
- Functional presentation controls where the reference implies interaction: navigation selection, check-in symptom choices and ratings, and action buttons/links with sensible local feedback.
- Route-specific page metadata for the recreated dashboard.

## Implementation approach
- Replace the current blank home screen with the dashboard experience.
- Define the reference-inspired semantic color, typography, radius, and chart tokens in the global design system.
- Use the existing interface controls and icon set, plus the installed chart library for the biomarker graph.
- Keep all displayed data local and deterministic; no accounts, database, purchasing, or external health integrations will be added.
- Use the meal image shown by the reference as visual guidance, but store any required image locally rather than hotlinking it.

## Validation
- Check the complete dashboard at desktop and mobile widths.
- Verify sidebar/mobile navigation, wellness selections, sliders, and primary actions.
- Confirm text does not clip or overlap and the first screen closely matches the reference hierarchy.
- Confirm the preview has no build, runtime, console, or failed asset errors.
