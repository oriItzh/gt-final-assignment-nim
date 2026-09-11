import type { GameState, Pile } from '../types/game'
import { CLASSIC_PILE_SIZES, pilesFromSizes } from '../core/random'

export const defaultPiles: Pile[] = pilesFromSizes(CLASSIC_PILE_SIZES)

export const initialGameState: GameState = {
  piles: defaultPiles,
  mode: 'normal',
  difficulty: 'adaptive',
  currentPlayer: 'user',
  history: [],
  status: 'setup',
  isComputerThinking: false,
  helperVisible: true,
}

export interface GameStateWithSnapshot extends GameState {
  initialPiles: Pile[]
}

export const initialStateWithSnapshot: GameStateWithSnapshot = {
  ...initialGameState,
  initialPiles: defaultPiles,
}
