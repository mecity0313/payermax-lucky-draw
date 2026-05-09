# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PayerMax Lucky Draw** is a React-based interactive lottery/raffle web application with a multi-round drawing system. Users can manage 3 consecutive rounds of draws with different prize levels, animated participant scrolling, winner selection, and confetti celebrations.

## Tech Stack

- **Framework**: React 18 with Vite 5 for fast development and bundling
- **Styling**: Tailwind CSS with PostCSS for utility-first design
- **State Management**: React Context API (LotteryContext) for global lottery state
- **Testing**: Playwright for E2E browser testing with HTML reports
- **Animations**: Framer Motion for UI transitions, canvas-confetti for celebrations
- **Linting**: ESLint with React and React Hooks plugins
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Layout/         # MainLayout, ScrollList (participant rolling display)
│   └── Lottery/        # DiamondDisplay, RollingNames (drawing-specific UI)
├── views/              # Page-level components
│   ├── HomeView        # Initial screen with "Start Lottery" button
│   └── LotteryDisplay  # Main drawing interface with rounds
├── store/
│   └── LotteryContext  # Global state for phases, rounds, winners, and keyboard controls
├── config/
│   └── lotteryConfig   # ROUNDS array (prize data), generateParticipants() data generator
├── utils/
│   └── soundManager    # Audio utilities
├── App.jsx             # Root component with phase-based rendering
└── main.jsx            # React DOM entry point with LotteryProvider wrapper
```

## State Architecture

**LotteryContext** manages the entire application flow:

- **Phases**: HOME → WAIT → DRAWING → RESULT → (repeat or end)
- **Data**: 300 auto-generated participants, winners tracked per round
- **Rounds**: 3 predefined rounds with prize details (title, count, image URL)
- **Keyboard Controls**: Space/Enter to advance through phases (built into useEffect with event listener)
- **Confetti**: Triggered on phase transition to RESULT (3-second animation)

The context exports `useLottery()` hook for components to access state and dispatch actions.

## Common Commands

```bash
# Development
npm run dev                          # Start Vite dev server (http://localhost:5173)
npm run build                        # Production bundle to dist/

# Linting
npm run lint                         # Check code style (ESLint with max-warnings 0)

# Testing
npx playwright test                  # Run all E2E tests (headless, 3 browsers: chromium, firefox, webkit)
npx playwright test lucky-draw.spec.ts  # Run single test file
npx playwright test --ui             # Interactive UI mode for debugging
npx playwright show-report           # Open HTML test report
```

## Key Points for Development

1. **Lottery Round Configuration**: Edit `src/config/lotteryConfig.js` to add/modify rounds or change prize details. The `ROUNDS` array controls drawing count, images, and titles.

2. **Participant Data**: The `generateParticipants()` function in `lotteryConfig.js` creates mock data. For real participant lists, replace this function's return logic.

3. **State Phase Flow**: When modifying behavior (e.g., skip a phase, add new transitions), update the phase handlers in `LotteryContext` and keyboard listener. Always verify the phase sequence doesn't break the drawing logic.

4. **Winner Selection**: The `stopDrawing()` method shuffles eligible participants (non-winners) and selects by `currentRound.matchCount`. The shuffle algorithm is simplistic (0.5 - Math.random()); use a proper algorithm if randomness quality matters.

5. **UI Rendering**: `App.jsx` uses phase to conditionally render views. Add new phases only if they require distinct UI; consider reusing existing views with props if minimal variation.

6. **Testing**: Playwright tests run against localhost:5173 and auto-start the dev server via `webServer` config in `playwright.config.ts`. CI retries tests and runs sequentially; local runs are parallel.

7. **Keyboard Binding**: The Space/Enter key listeners in `LotteryContext` useEffect depend on `[currentPhase, currentRoundIndex]`. If adding new state that affects key behavior, add it to dependencies.
