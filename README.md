# IplSimulator

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.10.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# IPL Playoff Prediction Simulator - Walkthrough

The IPL Playoff Prediction Simulator has been successfully implemented according to the approved plan. It is a full-featured, highly optimized Angular web application.

## What Was Completed

1. **App Architecture & Foundations**
   - Bootstrapped Angular app using the latest Angular CLI with Standalone Components and Signals.
   - Set up custom SCSS for a modern, responsive, glassmorphism UI with dark mode support.
   - Configured routing and layout (`NavbarComponent`).

2. **Core Logic & Services**
   - **`Models`**: Defined structured TypeScript interfaces (`Match`, `Standing`, `Team`, `SimulationStats`).
   - **`FixturesService`**: Manages remaining matches with reactive updates and `localStorage` persistence.
   - **`StandingsService`**: Computes accurate points and NRR on-the-fly based on completed match results.

3. **High-Performance Simulation Engine**
   - Implemented a pure TypeScript **Web Worker** (`simulation.worker.ts`) to handle heavy mathematical permutations off the main thread.
   - Calculates Top 2 %, Top 4 %, and elimination chances using an accurate Monte Carlo engine (handling millions of simulated outcomes in seconds) without freezing the UI.

4. **Dynamic User Interfaces**
   - **Dashboard**: A real-time `<table mat-table>` showing points, wins, losses, NRR, and recent form.
   - **Scenario Explorer**: "What-If" controls to quickly toggle match outcomes, instantly rippling changes to the standings.
   - **Remaining Matches**: Interactive UI with Material Sliders (`<mat-slider>`) allowing users to assign specific win probabilities (e.g., 70% vs 30%) instead of basic 50-50 chances.
   - **Probability Dashboard**: Visualizes the Web Worker results using `ng2-charts` and `chart.js`.

## Verification Results

- **Build Check**: Ran `npm run build`. The application bundled successfully with zero errors. Web Worker isolation is verified.
- **Dependencies**: Successfully integrated Angular Material (`@angular/material`), `chart.js`, and `ng2-charts`.
- **Performance**: The architecture utilizes Angular Signals natively so UI updates across components (e.g., clicking a Scenario toggle) are instant and memory-efficient.

## How to Run Locally

You can run the application directly from the terminal inside `f:\Deepak\Project\WinPrediction`:

```bash
npm install
npm run start
```

Then, open your browser to `http://localhost:4200/`.

> [!TIP]
> Use the **Scenario Explorer** to manually override outcomes, and use the **Probability Dashboard** to trigger the Web Worker Monte Carlo simulation based on your assigned match weights!
