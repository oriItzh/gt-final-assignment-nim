import { describe, expect, it } from 'vitest'
import { applyMoveToPiles } from '../nim'
import { pilesFromSizes } from '../random'
import {
  findOptimalMove,
  msbIndex,
  verifyMoveLeadsToPPosition,
} from '../solver'

describe('solver', () => {
  it('finds MSB index', () => {
    expect(msbIndex(0)).toBeNull()
    expect(msbIndex(1)).toBe(0)
    expect(msbIndex(5)).toBe(2)
    expect(msbIndex(8)).toBe(3)
  })

  it('finds optimal normal-play move for classic [3,5,7]', () => {
    const piles = pilesFromSizes([3, 5, 7])
    const move = findOptimalMove(piles, 'normal')
    expect(move).not.toBeNull()
    const amount = piles.find((p) => p.id === move!.pileId)!.size - move!.targetSize
    expect(verifyMoveLeadsToPPosition(piles, move!.pileId, amount)).toBe(true)
  })

  it('returns null for P-positions in normal play', () => {
    expect(findOptimalMove(pilesFromSizes([1, 2, 3]), 'normal')).toBeNull()
  })

  it('optimal normal move always leads to P-position', () => {
    const setups = [
      [3, 5, 7],
      [4, 4, 4],
      [1, 4, 5],
      [10, 3, 7],
    ]
    for (const sizes of setups) {
      const piles = pilesFromSizes(sizes)
      const move = findOptimalMove(piles, 'normal')
      if (move) {
        const pile = piles.find((p) => p.id === move.pileId)!
        const amount = pile.size - move.targetSize
        expect(verifyMoveLeadsToPPosition(piles, move.pileId, amount)).toBe(true)
      }
    }
  })

  describe('misère endgame', () => {
    it('handles all-ones position', () => {
      const piles = pilesFromSizes([1, 1, 1])
      const move = findOptimalMove(piles, 'misere')
      expect(move).toEqual({ pileId: 'pile-1', targetSize: 0 })
    })

    it('handles one large pile with odd 1-count [1,2]', () => {
      const piles = pilesFromSizes([1, 2])
      const move = findOptimalMove(piles, 'misere')
      expect(move).toEqual({ pileId: 'pile-2', targetSize: 0 })
    })

    it('handles one large pile with even 1-count [1,1,2]', () => {
      const piles = pilesFromSizes([1, 1, 2])
      const move = findOptimalMove(piles, 'misere')
      expect(move).toEqual({ pileId: 'pile-3', targetSize: 1 })
    })

    it('applies endgame correction when normal move leaves all ≤ 1', () => {
      const piles = pilesFromSizes([2, 1])
      const move = findOptimalMove(piles, 'misere')
      expect(move).not.toBeNull()
      const resulting = applyMoveToPiles(
        piles,
        move!.pileId,
        piles.find((p) => p.id === move!.pileId)!.size - move!.targetSize,
      )
      expect(resulting.every((p) => p.size <= 1)).toBe(true)
    })
  })
})
