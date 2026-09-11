import { describe, expect, it } from 'vitest'
import { bitParity, toBinaryMatrix, verifyMatrixXorSum } from '../binary'
import { xorSum } from '../nim'
import { pilesFromSizes } from '../random'

describe('binary', () => {
  it('builds binary matrix for classic piles', () => {
    const piles = pilesFromSizes([3, 5, 7])
    const matrix = toBinaryMatrix(piles)
    expect(matrix.bitWidth).toBe(3)
    expect(matrix.columnHeaders).toEqual([4, 2, 1])
    expect(matrix.rows).toHaveLength(3)
    expect(matrix.rows[0].bits).toEqual([0, 1, 1])
    expect(matrix.rows[1].bits).toEqual([1, 0, 1])
    expect(matrix.rows[2].bits).toEqual([1, 1, 1])
  })

  it('computes XOR parity row', () => {
    const piles = pilesFromSizes([3, 5, 7])
    const matrix = toBinaryMatrix(piles)
    expect(matrix.xorParityRow).toEqual([0, 0, 1])
  })

  it('parity row matches xorSum', () => {
    const piles = pilesFromSizes([3, 5, 7])
    const matrix = toBinaryMatrix(piles)
    expect(verifyMatrixXorSum(piles, matrix)).toBe(true)
    expect(xorSum(piles)).toBe(1)
  })

  it('produces bit columns with parity', () => {
    const matrix = toBinaryMatrix(pilesFromSizes([3, 5, 7]))
    const columns = bitParity(matrix)
    expect(columns).toHaveLength(3)
    expect(columns[2].parity).toBe(1)
    expect(columns[0].parity).toBe(0)
  })
})
