export interface BitColumn {
  bitIndex: number
  decimalValue: number
  pileBits: number[]
  parity: number
}

export interface PileBinaryRow {
  pileId: string
  size: number
  bits: number[]
}

export interface BinaryRepresentation {
  bitWidth: number
  columnHeaders: number[]
  rows: PileBinaryRow[]
  xorParityRow: number[]
}
