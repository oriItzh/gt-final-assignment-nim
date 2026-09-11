import type { Difficulty, GameMode, Move, Pile } from '../types/game'
import { allLegalMoves, createMove } from './nim'
import { findOptimalMove, isOptimalMove } from './solver'

export function randomLegalMove(
  piles: Pile[],
  player: 'computer' = 'computer',
  random: () => number = Math.random,
): Move {
  const moves = allLegalMoves(piles)
  if (moves.length === 0) {
    throw new Error('No legal moves available')
  }
  const choice = moves[Math.floor(random() * moves.length)]
  const pile = piles.find((p) => p.id === choice.pileId)!
  return createMove(choice.pileId, choice.amount, pile.size - choice.amount, player)
}

export function conservativeLegalMove(piles: Pile[], player: 'computer' = 'computer'): Move {
  const nonEmpty = piles.filter((p) => p.size > 0)
  const largest = nonEmpty.reduce((a, b) => (a.size >= b.size ? a : b))
  return createMove(largest.id, 1, largest.size - 1, player)
}

export function optimalMove(piles: Pile[], mode: GameMode, player: 'computer' = 'computer'): Move | null {
  const optimal = findOptimalMove(piles, mode)
  if (!optimal) return null
  const pile = piles.find((p) => p.id === optimal.pileId)
  if (!pile) return null
  const amountRemoved = pile.size - optimal.targetSize
  if (amountRemoved <= 0 || amountRemoved > pile.size) return null
  return createMove(optimal.pileId, amountRemoved, optimal.targetSize, player)
}

export function chooseComputerMove(
  piles: Pile[],
  mode: GameMode,
  difficulty: Difficulty,
  random: () => number = Math.random,
): Move {
  const optimal = optimalMove(piles, mode, 'computer')

  if (difficulty === 'grandmaster') {
    if (optimal) return optimal
    return conservativeLegalMove(piles, 'computer')
  }

  if (difficulty === 'adaptive') {
    if (optimal && random() < 0.7) return optimal
    return randomLegalMove(piles, 'computer', random)
  }

  return randomLegalMove(piles, 'computer', random)
}

export function isComputerMoveOptimal(
  piles: Pile[],
  mode: GameMode,
  move: Move,
): boolean {
  return isOptimalMove(piles, mode, move.pileId, move.amountRemoved)
}
