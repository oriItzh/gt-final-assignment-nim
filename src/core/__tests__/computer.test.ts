import { describe, expect, it } from 'vitest'
import {
  chooseComputerMove,
  conservativeLegalMove,
  isComputerMoveOptimal,
  optimalMove,
  randomLegalMove,
} from '../computer'
import { pilesFromSizes } from '../random'

describe('computer', () => {
  const classic = pilesFromSizes([3, 5, 7])

  it('grandmaizer always plays optimal when available', () => {
    const move = chooseComputerMove(classic, 'normal', 'grandmaizer')
    expect(isComputerMoveOptimal(classic, 'normal', move)).toBe(true)
    expect(move.player).toBe('computer')
  })

  it('grandmaizer falls back to conservative move in P-position', () => {
    const pPosition = pilesFromSizes([1, 2, 3])
    const move = chooseComputerMove(pPosition, 'normal', 'grandmaizer')
    expect(move.amountRemoved).toBe(1)
    expect(move.player).toBe('computer')
  })

  it('adaptive plays optimal ~70% of the time', () => {
    let optimalCount = 0
    const trials = 1000
    for (let i = 0; i < trials; i++) {
      const random = () => (i % 10 < 7 ? 0.1 : 0.9)
      const move = chooseComputerMove(classic, 'normal', 'adaptive', random)
      if (isComputerMoveOptimal(classic, 'normal', move)) {
        optimalCount++
      }
    }
    expect(optimalCount).toBeGreaterThan(650)
    expect(optimalCount).toBeLessThan(750)
  })

  it('dardaleh plays random legal moves', () => {
    const moves = new Set<string>()
    for (let i = 0; i < 200; i++) {
      const move = chooseComputerMove(classic, 'normal', 'dardaleh', () => Math.random())
      moves.add(`${move.pileId}:${move.amountRemoved}`)
    }
    expect(moves.size).toBeGreaterThan(1)
  })

  it('randomLegalMove picks from legal moves only', () => {
    const move = randomLegalMove(classic, 'computer', () => 0)
    const pile = classic.find((p) => p.id === move.pileId)!
    expect(move.amountRemoved).toBeGreaterThanOrEqual(1)
    expect(move.amountRemoved).toBeLessThanOrEqual(pile.size)
  })

  it('conservativeLegalMove removes 1 from largest pile', () => {
    const move = conservativeLegalMove(classic)
    expect(move.pileId).toBe('pile-3')
    expect(move.amountRemoved).toBe(1)
    expect(move.resultingSize).toBe(6)
  })

  it('optimalMove returns null in P-position', () => {
    expect(optimalMove(pilesFromSizes([1, 2, 3]), 'normal')).toBeNull()
  })

  it('throws when no legal moves exist', () => {
    expect(() => randomLegalMove(pilesFromSizes([0, 0]))).toThrow()
  })
})
