import type { HelperHint } from '../types/helper'
import type { GameMode, Pile } from '../types/game'
import { isNPosition, xorSum } from './nim'
import { buildHintExplanation, findOptimalMove, msbIndex } from './solver'

export function buildHelperHint(piles: Pile[], mode: GameMode): HelperHint {
  const sum = xorSum(piles)
  const optimal = findOptimalMove(piles, mode)

  return {
    position: isNPosition(piles) ? 'N' : 'P',
    xorSum: sum,
    msbIndex: msbIndex(sum),
    recommendedPileId: optimal?.pileId ?? null,
    targetSize: optimal?.targetSize ?? null,
    explanationSteps: buildHintExplanation(piles, mode, optimal),
  }
}
