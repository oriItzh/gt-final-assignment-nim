import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { toBinaryMatrix } from '../core/binary'
import { chooseComputerMove } from '../core/computer'
import { buildHelperHint } from '../core/hint'
import { isNPosition, xorSum } from '../core/nim'
import type { HelperHint } from '../types/helper'
import type { BinaryRepresentation } from '../types/binary'
import type { Difficulty, GameMode, Pile } from '../types/game'
import type { GameAction } from './gameReducer'
import { createInitialState, gameReducer } from './gameReducer'
import type { GameStateWithSnapshot } from './initialState'

const THINKING_DELAY_MIN_MS = 400
const THINKING_DELAY_MAX_MS = 800

export interface GameDerivedState {
  xorSum: number
  isNPosition: boolean
  binaryMatrix: BinaryRepresentation
  hint: HelperHint
}

export interface HighlightState {
  pileId: string | null
  bitIndex: number | null
}

interface GameContextValue {
  state: GameStateWithSnapshot
  dispatch: React.Dispatch<GameAction>
  derived: GameDerivedState
  highlight: HighlightState
  setHighlight: (pileId: string | null, bitIndex: number | null) => void
  clearHighlight: () => void
  startGame: (piles: Pile[], mode: GameMode, difficulty: Difficulty) => void
}

const GameContext = createContext<GameContextValue | null>(null)

function randomThinkingDelay(): number {
  return (
    THINKING_DELAY_MIN_MS +
    Math.floor(Math.random() * (THINKING_DELAY_MAX_MS - THINKING_DELAY_MIN_MS + 1))
  )
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [highlight, setHighlightState] = useState<HighlightState>({
    pileId: null,
    bitIndex: null,
  })

  const setHighlight = useCallback((pileId: string | null, bitIndex: number | null) => {
    setHighlightState({ pileId, bitIndex })
  }, [])

  const clearHighlight = useCallback(() => {
    setHighlightState({ pileId: null, bitIndex: null })
  }, [])

  const derived = useMemo<GameDerivedState>(
    () => ({
      xorSum: xorSum(state.piles),
      isNPosition: isNPosition(state.piles),
      binaryMatrix: toBinaryMatrix(state.piles),
      hint: buildHelperHint(state.piles, state.mode),
    }),
    [state.piles, state.mode],
  )

  const startGame = useCallback(
    (piles: Pile[], mode: GameMode, difficulty: Difficulty) => {
      dispatch({ type: 'START_GAME', piles, mode, difficulty })
    },
    [],
  )

  useEffect(() => {
    if (
      state.status !== 'playing' ||
      state.currentPlayer !== 'computer' ||
      !state.isComputerThinking
    ) {
      return
    }

    const delay = randomThinkingDelay()
    timeoutRef.current = setTimeout(() => {
      const move = chooseComputerMove(state.piles, state.mode, state.difficulty)
      dispatch({ type: 'COMPUTER_MOVE_RESOLVED', move })
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [
    state.status,
    state.currentPlayer,
    state.isComputerThinking,
    state.piles,
    state.mode,
    state.difficulty,
  ])

  const value = useMemo(
    () => ({
      state,
      dispatch,
      derived,
      highlight,
      setHighlight,
      clearHighlight,
      startGame,
    }),
    [state, derived, highlight, setHighlight, clearHighlight, startGame],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
