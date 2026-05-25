# IPL Win Predictor & Simulator 🏏

An interactive web application built with Angular 21 to predict and simulate Indian Premier League (IPL) playoff scenarios. The app allows cricket fans to predict the outcomes of remaining matches and instantly see how those results impact their favorite team's chances of making it to the playoffs.

## 🌟 Features

* **Interactive Match Predictions:** View a list of remaining matches and select the winner to see how it affects the points table.
* **Live Points Table:** A dynamic points table that updates instantly based on your match predictions.
* **Playoff Probability Calculation:** Runs complex simulation scenarios (including Monte Carlo simulations for a large number of unknowns) to accurately calculate the percentage probability of each team qualifying for the playoffs.
* **Team Form Tracking:** Visual indicators of a team's recent form (Wins, Losses, No Results).
* **Qualification & Elimination Status:** Automatically highlights teams that have officially qualified for the playoffs or have been mathematically eliminated.

## 🚀 Tech Stack

* **Framework:** [Angular 21](https://angular.dev/)
* **State Management:** Angular Signals for highly reactive and efficient state updates.
* **Templating:** Uses the latest Angular Control Flow syntax (`@if`, `@for`).
* **Styling:** Custom CSS/SCSS with a modern, glassmorphic aesthetic.

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd iplwinpredictor
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   *(or run `ng serve` if you have the Angular CLI installed globally)*

4. Open your browser and navigate to `http://localhost:4200/` to use the simulator.

   <img width="1754" height="1350" alt="image" src="https://github.com/user-attachments/assets/8ed2491c-f5b0-4102-9d7a-23b993036357" />
   <img width="2958" height="1494" alt="image" src="https://github.com/user-attachments/assets/ddb82e1b-ec80-48dc-bbb3-fc961dd57bfa" />



## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
