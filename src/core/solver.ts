import type { GameMode, OptimalMove, Pile } from '../types/game'
import { applyMoveToPiles, isPPosition, xorSum } from './nim'

export function msbIndex(n: number): number | null {
  if (n <= 0) return null
  return Math.floor(Math.log2(n))
}

export function numberToBits(value: number, width: number): number[] {
  const bits: number[] = []
  for (let i = width - 1; i >= 0; i--) {
    bits.push((value >> i) & 1)
  }
  return bits
}

function isAllPilesAtMostOne(piles: Pile[]): boolean {
  return piles.every((pile) => pile.size <= 1)
}

function countPilesOfSizeOne(piles: Pile[]): number {
  return piles.filter((pile) => pile.size === 1).length
}

function findNormalOptimalMove(piles: Pile[]): OptimalMove | null {
  const s = xorSum(piles)
  if (s === 0) return null

  const msb = msbIndex(s)
  if (msb === null) return null

  for (const pile of piles) {
    if (pile.size <= 0) continue
    const targetSize = pile.size ^ s
    if (targetSize < pile.size && ((pile.size >> msb) & 1) === 1) {
      return { pileId: pile.id, targetSize }
    }
  }

  return null
}

function findMisereEndgameMove(piles: Pile[]): OptimalMove | null {
  const onesCount = countPilesOfSizeOne(piles)
  const nonOnePiles = piles.filter((pile) => pile.size > 1)

  if (nonOnePiles.length === 0) {
    const pileWithOne = piles.find((pile) => pile.size === 1)
    if (!pileWithOne) return null
    return { pileId: pileWithOne.id, targetSize: 0 }
  }

  // One pile > 1 with some 1-piles: odd count of 1s → reduce big to 0; even → reduce to 1.
  if (nonOnePiles.length === 1) {
    const pile = nonOnePiles[0]
    if (onesCount % 2 === 1) {
      return { pileId: pile.id, targetSize: 0 }
    }
    return { pileId: pile.id, targetSize: 1 }
  }

  return null
}

function findMisereOptimalMove(piles: Pile[]): OptimalMove | null {
  const normalMove = findNormalOptimalMove(piles)
  if (!normalMove) return null

  const resultingPiles = applyMoveToPiles(
    piles,
    normalMove.pileId,
    piles.find((p) => p.id === normalMove.pileId)!.size - normalMove.targetSize,
  )

  if (isAllPilesAtMostOne(resultingPiles)) {
    const endgameMove = findMisereEndgameMove(piles)
    if (endgameMove) return endgameMove
  }

  return normalMove
}

export function findOptimalMove(piles: Pile[], mode: GameMode): OptimalMove | null {
  if (piles.every((pile) => pile.size === 0)) return null

  if (mode === 'normal') {
    return findNormalOptimalMove(piles)
  }

  if (isAllPilesAtMostOne(piles)) {
    return findMisereEndgameMove(piles)
  }

  return findMisereOptimalMove(piles)
}

export function buildHintExplanation(
  piles: Pile[],
  mode: GameMode,
  move: OptimalMove | null,
): string[] {
  const s = xorSum(piles)
  const position = s === 0 ? 'P' : 'N'

  if (position === 'P') {
    return [
      `XOR sum S = ${piles.map((p) => p.size).join(' ⊕ ')} = ${s}.`,
      'All bit parities are even — this is a losing position (P-position).',
      'Any legal move will leave the opponent in a winning position.',
    ]
  }

  if (!move) {
    return [`XOR sum S = ${s} (N-position), but no optimal move was found.`]
  }

  const pile = piles.find((p) => p.id === move.pileId)
  if (!pile) return []

  const msb = msbIndex(s)
  const amountRemoved = pile.size - move.targetSize

  const steps = [
    `XOR sum S = ${piles.map((p) => p.size).join(' ⊕ ')} = ${s}.`,
    `This is a winning position (N-position) because S ≠ 0.`,
  ]

  if (msb !== null) {
    steps.push(
      `Bit ${msb} (value ${2 ** msb}) is the MSB of S.`,
      `Pile "${pile.id}" has size ${pile.size} (${numberToBits(pile.size, msb + 1).join('')}) with that bit set.`,
      `Reduce it to ${move.targetSize} (${numberToBits(move.targetSize, msb + 1).join('')}) by removing ${amountRemoved} token(s).`,
      `After the move, all bit parities become even — a P-position for the opponent.`,
    )
  }

  if (mode === 'misere') {
    steps.push('(Misère mode: endgame correction applied when all piles would be ≤ 1.)')
  }

  return steps
}

export function isOptimalMove(piles: Pile[], mode: GameMode, pileId: string, amount: number): boolean {
  const optimal = findOptimalMove(piles, mode)
  if (!optimal) return false
  const pile = piles.find((p) => p.id === pileId)
  if (!pile) return false
  return optimal.pileId === pileId && pile.size - amount === optimal.targetSize
}

export function verifyMoveLeadsToPPosition(
  piles: Pile[],
  pileId: string,
  amount: number,
): boolean {
  const resulting = applyMoveToPiles(piles, pileId, amount)
  return isPPosition(resulting)
}
