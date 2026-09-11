# Generalized Nim — Game Theory Lab

An interactive web application for playing **Generalized Nim** against a computer opponent, built as an academic game theory project. The app combines a playable game arena with a live **binary matrix** and **XOR strategy helper**, making it easy to explore winning and losing positions in real time.

## Features

- **Player vs. Computer** — take turns removing sticks from a single pile; supports Normal play (last move wins) and Misère play (last move loses)
- **Configurable games** — set up 2–7 piles with custom sizes (1–100) or randomize all piles at once
- **Three difficulty levels**
  - **Grandmaizer** — always plays the mathematically optimal move
  - **Adaptive** — plays optimally ~70% of the time, random otherwise
  - **Dardaleh** — plays uniformly random legal moves
- **Game Theory Lab panel**
  - Live binary matrix with XOR parity row
  - N/P position evaluation and step-by-step hint explanations
  - Cross-highlighting between hints, piles, and bit columns
- **Visual feedback** — horizontal stick piles with removal animations, move snackbars, and a "Thinking…" indicator during the computer's 5-second turn delay
- **Dark mode** — toggle between light and dark themes (preference saved in browser)

## Tech Stack

- React + TypeScript (Vite)
- Material UI (MUI)
- Vitest for unit tests (Nim solver, computer logic, game state)

## Setup

**Prerequisites:** Node.js 18+ and npm

```bash
git clone <repository-url>
cd final-assignment-code
npm install
```

## Running

**Development server** (with hot reload):

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

**Production build:**

```bash
npm run build
npm run preview
```

**Run tests:**

```bash
npm run test
```

**Lint:**

```bash
npm run lint
```
