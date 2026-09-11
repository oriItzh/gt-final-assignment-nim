import type { Pile } from '../types/game'

export function generateRandomPiles(
  minPiles = 3,
  maxPiles = 7,
  maxHeight = 15,
): Pile[] {
  const count =
    minPiles + Math.floor(Math.random() * (maxPiles - minPiles + 1))
  return Array.from({ length: count }, (_, i) => ({
    id: `pile-${i + 1}`,
    size: 1 + Math.floor(Math.random() * maxHeight),
  }))
}

export function pilesFromSizes(sizes: number[]): Pile[] {
  return sizes.map((size, i) => ({
    id: `pile-${i + 1}`,
    size,
  }))
}

export const CLASSIC_PILE_SIZES = [3, 5, 7]

export function randomPileSizes(
  count: number,
  min = 1,
  max = 100,
): number[] {
  return Array.from(
    { length: count },
    () => min + Math.floor(Math.random() * (max - min + 1)),
  )
}
