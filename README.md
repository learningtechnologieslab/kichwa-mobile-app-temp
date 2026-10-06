# Kichwa Learning

A mobile-friendly Kichwa language-learning web prototype built with React, TypeScript, and Vite. Desktop and mobile browsers use the same application; this repository does not contain a separate native Android/iOS app or an installable PWA.

## Open the prototype

Install Node.js 22.12+ (Node.js 24 also works), then run these commands from the repository root:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173. Keep the terminal running; press Ctrl+C to stop the server. Use the browser's responsive/device mode to preview the phone layout.

To view it on a phone connected to the same local network:

```sh
npm run dev -- --host 0.0.0.0
```

Open the Network URL printed by Vite on your phone. The recording interaction is simulated and does not require microphone access.

## What you can try

Choose English or Spanish, start the **First Mother** quest, and select one of seven animal paths:

Quest introduction → animal choice → vocabulary quiz → speaking and transcription review → translation and word labeling → photo activity → ending.

The profile and quest list show your progress. Progress, interface language, translation drafts, and word labels are saved in this browser's local storage.

### Prototype boundaries

- This HCI prototype simulates recording: Record myself starts a visual recording state and Stop recording hides the source phrase and its translation, then reveals deliberately imperfect preset text from `src/content/mocks/` after a brief processing animation. No microphone permission, audio capture, playback, or speech-recognition service is used. Record again starts a fresh simulated attempt; there is no practice bypass.
- Corrected transcription text is not persisted. Translation and word labels are collected without checking linguistic correctness.
- No audio is created. Photo previews are temporary and are not uploaded or persisted. There is no backend, account system, or cross-device synchronization.

## Repository layout

```text
docs/quests/        Original quest and question material
scripts/           Screenshot utility
src/components/    Shared interface components
src/content/       Quest content and English/Spanish interface copy
src/content/mocks/ Prototype-only transcription fixtures
src/hooks/         Photo preview and hash routing
src/pages/         Top-level application pages
src/quest/         Individual quest stages
src/state/         Learning state and local progress persistence
tests/             Playwright browser tests
```

Unit tests live beside the source files they exercise. Root configuration files configure Vite, TypeScript, linting, formatting, and browser tests; `index.html` is the single application entry point.

## Development checks

```sh
npm run lint
npm test
npm run build
```

For browser tests, build first and install Chromium once:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

`npm run preview` serves the production build locally, normally at http://127.0.0.1:4173.

For screenshots, run the development server in a separate terminal, install Playwright Chromium as above, then run `npm run capture`. Screenshots cover both languages and all stages, including translation, at eight viewport widths. Output goes to the ignored `.visual-baseline/after/` directory. An optional argument changes the output folder (`npm run capture -- before`); the `CAPTURE_URL` environment variable changes the server URL.

Generated dependencies, builds, test reports, and screenshots are excluded from Git. Keep `package-lock.json` committed for reproducible installs.
