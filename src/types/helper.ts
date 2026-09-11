export type PositionEvaluation = 'N' | 'P'

export interface HelperHint {
  position: PositionEvaluation
  xorSum: number
  msbIndex: number | null
  recommendedPileId: string | null
  targetSize: number | null
  explanationSteps: string[]
}
