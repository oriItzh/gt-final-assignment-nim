import { describe, expect, it } from 'vitest'
import {
  CLASSIC_PILE_SIZES,
  generateRandomPiles,
  pilesFromSizes,
} from '../random'

describe('random', () => {
  it('creates piles from sizes', () => {
    const piles = pilesFromSizes([3, 5, 7])
    expect(piles).toHaveLength(3)
    expect(piles[0]).toEqual({ id: 'pile-1', size: 3 })
  })

  it('exposes classic pile sizes', () => {
    expect(CLASSIC_PILE_SIZES).toEqual([3, 5, 7])
  })

  it('generates random piles within bounds', () => {
    const piles = generateRandomPiles(3, 5, 10)
    expect(piles.length).toBeGreaterThanOrEqual(3)
    expect(piles.length).toBeLessThanOrEqual(5)
    for (const pile of piles) {
      expect(pile.size).toBeGreaterThanOrEqual(1)
      expect(pile.size).toBeLessThanOrEqual(10)
    }
  })
})
