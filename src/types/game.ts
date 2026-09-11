export type GameMode = 'normal' | 'misere'
export type Difficulty = 'grandmaster' | 'adaptive' | 'novice'
export type Player = 'user' | 'computer'
export type GameStatus = 'setup' | 'playing' | 'user-won' | 'computer-won'

export interface Pile {
  id: string
  size: number
}

export interface Move {
  pileId: string
  amountRemoved: number
  resultingSize: number
  player: Player
}

export interface GameState {
  piles: Pile[]
  mode: GameMode
  difficulty: Difficulty
  currentPlayer: Player
  history: Move[]
  status: GameStatus
  isComputerThinking: boolean
  helperVisible: boolean
}

export interface OptimalMove {
  pileId: string
  targetSize: number
}
