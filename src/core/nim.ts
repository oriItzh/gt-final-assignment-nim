import type { GameMode, GameState, Move, Pile, Player } from '../types/game'

export function xorSum(piles: Pile[]): number {
  return piles.reduce((acc, pile) => acc ^ pile.size, 0)
}

export function isNPosition(piles: Pile[]): boolean {
  return xorSum(piles) !== 0
}

export function isPPosition(piles: Pile[]): boolean {
  return xorSum(piles) === 0
}

export function legalMoves(pile: Pile): number[] {
  if (pile.size <= 0) return []
  return Array.from({ length: pile.size }, (_, i) => i + 1)
}

export function allLegalMoves(piles: Pile[]): Array<{ pileId: string; amount: number }> {
  const moves: Array<{ pileId: string; amount: number }> = []
  for (const pile of piles) {
    for (const amount of legalMoves(pile)) {
      moves.push({ pileId: pile.id, amount })
    }
  }
  return moves
}

export function applyMoveToPiles(piles: Pile[], pileId: string, amount: number): Pile[] {
  return piles.map((pile) =>
    pile.id === pileId ? { ...pile, size: pile.size - amount } : pile,
  )
}

export function isGameOver(piles: Pile[]): boolean {
  return piles.every((pile) => pile.size === 0)
}

export function getWinnerAfterMove(mode: GameMode, lastPlayer: Player): Player {
  if (mode === 'normal') {
    return lastPlayer
  }
  return lastPlayer === 'user' ? 'computer' : 'user'
}

export function createMove(
  pileId: string,
  amountRemoved: number,
  resultingSize: number,
  player: Player,
): Move {
  return { pileId, amountRemoved, resultingSize, player }
}

export function applyMove(state: GameState, move: Move): GameState {
  const piles = applyMoveToPiles(state.piles, move.pileId, move.amountRemoved)
  const gameOver = isGameOver(piles)

  return {
    ...state,
    piles,
    history: [...state.history, move],
    status: gameOver
      ? getWinnerAfterMove(state.mode, move.player) === 'user'
        ? 'user-won'
        : 'computer-won'
      : 'playing',
    currentPlayer: gameOver
      ? state.currentPlayer
      : move.player === 'user'
        ? 'computer'
        : 'user',
    isComputerThinking: gameOver ? false : move.player === 'user',
  }
}
