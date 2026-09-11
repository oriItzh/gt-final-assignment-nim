import type { BinaryRepresentation, BitColumn } from '../types/binary'
import type { Pile } from '../types/game'
import { msbIndex, numberToBits } from './solver'
import { xorSum } from './nim'

function computeBitWidth(piles: Pile[]): number {
  const maxSize = Math.max(0, ...piles.map((p) => p.size))
  if (maxSize === 0) return 1
  const msb = msbIndex(maxSize)
  return msb !== null ? msb + 1 : 1
}

export function toBinaryMatrix(piles: Pile[]): BinaryRepresentation {
  const bitWidth = computeBitWidth(piles)
  const columnHeaders = Array.from({ length: bitWidth }, (_, i) => 2 ** (bitWidth - 1 - i))

  const rows = piles.map((pile) => ({
    pileId: pile.id,
    size: pile.size,
    bits: numberToBits(pile.size, bitWidth),
  }))

  const xorParityRow: number[] = []
  for (let col = 0; col < bitWidth; col++) {
    let parity = 0
    for (const row of rows) {
      parity ^= row.bits[col]
    }
    xorParityRow.push(parity)
  }

  return { bitWidth, columnHeaders, rows, xorParityRow }
}

export function bitParity(matrix: BinaryRepresentation): BitColumn[] {
  return matrix.columnHeaders.map((decimalValue, col) => {
    const pileBits = matrix.rows.map((row) => row.bits[col])
    const parity = pileBits.reduce((acc, bit) => acc ^ bit, 0)
    return {
      bitIndex: matrix.bitWidth - 1 - col,
      decimalValue,
      pileBits,
      parity,
    }
  })
}

export function getXorSumFromMatrix(matrix: BinaryRepresentation): number {
  let result = 0
  for (let col = 0; col < matrix.bitWidth; col++) {
    if (matrix.xorParityRow[col] === 1) {
      result |= matrix.columnHeaders[col]
    }
  }
  return result
}

export function verifyMatrixXorSum(piles: Pile[], matrix: BinaryRepresentation): boolean {
  return getXorSumFromMatrix(matrix) === xorSum(piles)
}
