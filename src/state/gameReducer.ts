import type { Difficulty, GameMode, Move, Pile } from '../types/game'
import type { GameState } from '../types/game'
import { applyMove, createMove, legalMoves } from '../core/nim'
import type { GameStateWithSnapshot } from './initialState'
import { initialStateWithSnapshot } from './initialState'

export type GameAction =
  | { type: 'START_GAME'; piles: Pile[]; mode: GameMode; difficulty: Difficulty }
  | { type: 'USER_MOVE'; pileId: string; amount: number }
  | { type: 'COMPUTER_MOVE_RESOLVED'; move: Move }
  | { type: 'RESET_GAME' }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'TOGGLE_HELPER' }

function clonePiles(piles: Pile[]): Pile[] {
  return piles.map((pile) => ({ ...pile }))
}

export function gameReducer(
  state: GameStateWithSnapshot,
  action: GameAction,
): GameStateWithSnapshot {
  switch (action.type) {
    case 'START_GAME': {
      const piles = clonePiles(action.piles)
      return {
        ...state,
        piles,
        initialPiles: clonePiles(action.piles),
        mode: action.mode,
        difficulty: action.difficulty,
        currentPlayer: 'user',
        history: [],
        status: 'playing',
        isComputerThinking: false,
      }
    }

    case 'USER_MOVE': {
      if (state.status !== 'playing' || state.currentPlayer !== 'user') {
        return state
      }
      const pile = state.piles.find((p) => p.id === action.pileId)
      if (!pile || !legalMoves(pile).includes(action.amount)) {
        return state
      }
      const move = createMove(
        action.pileId,
        action.amount,
        pile.size - action.amount,
        'user',
      )
      const next = applyMove(state, move)
      return { ...next, initialPiles: state.initialPiles }
    }

    case 'COMPUTER_MOVE_RESOLVED': {
      if (state.status !== 'playing' || state.currentPlayer !== 'computer') {
        return state
      }
      const next = applyMove(state, action.move)
      return {
        ...next,
        initialPiles: state.initialPiles,
        isComputerThinking: false,
      }
    }

    case 'RESET_GAME': {
      const piles = clonePiles(state.initialPiles)
      return {
        ...state,
        piles,
        currentPlayer: 'user',
        history: [],
        status: 'playing',
        isComputerThinking: false,
      }
    }

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.difficulty }

    case 'SET_MODE':
      return { ...state, mode: action.mode }

    case 'TOGGLE_HELPER':
      return { ...state, helperVisible: !state.helperVisible }

    default:
      return state
  }
}

export function createInitialState(): GameStateWithSnapshot {
  return { ...initialStateWithSnapshot, initialPiles: clonePiles(initialStateWithSnapshot.initialPiles) }
}

export type { Difficulty, GameMode, GameState }
