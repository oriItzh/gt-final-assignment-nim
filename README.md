# Generalized Nim

An interactive Generalized Nim game for a university game theory course. Play against a computer opponent while exploring XOR-based winning strategy through a live binary analysis panel.

## Features

- Play Generalized Nim in **Normal** mode (last move wins) or **Misère** mode (last move loses)
- Configure 2–7 piles with custom sizes (1–100) or randomize all piles before starting
- Three computer difficulty levels: **Grandmaizer** (optimal), **Adaptive** (mostly optimal), and **Dardaleh** (random)
- Live **Binary Matrix** showing each pile in binary with XOR parity highlighting
- **XOR Helper** with N/P position evaluation, recommended moves, and step-by-step explanations
- Visual stick piles with removal animations and move notifications
- Light and dark mode

## Tech Stack

React, TypeScript, Material UI, Vite

## Setup

Requires Node.js 18+.

```bash
git clone https://github.com/oriItzh/gt-final-assignment-nim.git
cd gt-final-assignment-nim
npm install
```

## Running

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

Build for production:

```bash
npm run build
npm run preview
```

Run tests:

```bash
npm run test
```
