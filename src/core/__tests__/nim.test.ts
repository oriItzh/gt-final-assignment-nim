import { describe, expect, it } from 'vitest'
import {
  allLegalMoves,
  applyMoveToPiles,
  isGameOver,
  isNPosition,
  isPPosition,
  legalMoves,
  xorSum,
} from '../nim'
import { pilesFromSizes } from '../random'

describe('nim', () => {
  const classic = pilesFromSizes([3, 5, 7])

  it('computes XOR sum for classic setup', () => {
    expect(xorSum(classic)).toBe(1)
  })

  it('classifies N and P positions', () => {
    expect(isNPosition(classic)).toBe(true)
    expect(isPPosition(classic)).toBe(false)
    expect(isPPosition(pilesFromSizes([1, 2, 3]))).toBe(true)
  })

  it('returns legal move amounts 1..pile.size', () => {
    expect(legalMoves({ id: 'a', size: 5 })).toEqual([1, 2, 3, 4, 5])
    expect(legalMoves({ id: 'a', size: 0 })).toEqual([])
  })

  it('enumerates all legal moves across piles', () => {
    const moves = allLegalMoves(pilesFromSizes([2, 1]))
    expect(moves).toHaveLength(3)
  })

  it('applies a move to piles', () => {
    const result = applyMoveToPiles(classic, 'pile-2', 1)
    expect(result.find((p) => p.id === 'pile-2')?.size).toBe(4)
  })

  it('detects game over when all piles are empty', () => {
    expect(isGameOver(pilesFromSizes([0, 0, 0]))).toBe(true)
    expect(isGameOver(classic)).toBe(false)
  })
})
