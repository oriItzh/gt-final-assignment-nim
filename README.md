# Generalized Nim

Final project for the Game theory course. It's a playable version of Nim which was introduced at the beginning of the course, where you go up against a computer opponent, with a binary/XOR panel on the side so you can actually see the winning strategy while you play instead of just taking it on faith.

Live version: https://oriitzh.github.io/gt-final-assignment-nim/

## What it does

You pick how many piles (2 to 7) and how big each one is (1 to 100), or just hit randomize if you don't feel like typing numbers. There's a normal mode (last player to move wins) and misère mode (last player to move loses), which flips the whole strategy on its head.

For the computer opponent you get three options: Grandmaizer plays optimally every time, Adaptive mostly plays well but slips up occasionally, and Dardaleh just moves randomly if you want an easy game.

The fun part is the binary matrix — it shows every pile's size in binary and highlights the XOR parity of each column, so you can watch the nim-sum update as piles change. There's also an XOR helper that tells you whether you're in a winning (N) or losing (P) position and suggests a move, with an explanation of why.

Piles are drawn as sticks that animate when removed, and there's a light/dark toggle because staring at a game theory demo at 2am shouldn't hurt your eyes.

## Built with

React, TypeScript, Material UI, and Vite.

## Getting it running locally

You'll need Node 18 or newer.

```bash
git clone https://github.com/oriItzh/gt-final-assignment-nim.git
cd gt-final-assignment-nim
npm install
npm run dev
```

Then open `http://localhost:5173`.

To build for production and preview that build:

```bash
npm run build
npm run preview
```

To run the test suite:

```bash
npm run test
```
