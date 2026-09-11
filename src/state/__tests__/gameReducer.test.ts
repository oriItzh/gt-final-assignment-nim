import { describe, expect, it } from 'vitest'
import { pilesFromSizes } from '../../core/random'
import { createInitialState, gameReducer } from '../gameReducer'

describe('gameReducer', () => {
  const classic = pilesFromSizes([3, 5, 7])

  it('starts a game', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      piles: classic,
      mode: 'normal',
      difficulty: 'grandmaizer',
    })
    expect(state.status).toBe('playing')
    expect(state.piles).toEqual(classic)
    expect(state.currentPlayer).toBe('user')
  })

  it('applies a valid user move and hands off to computer', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      piles: classic,
      mode: 'normal',
      difficulty: 'grandmaizer',
    })
    state = gameReducer(state, { type: 'USER_MOVE', pileId: 'pile-1', amount: 1 })
    expect(state.piles[0].size).toBe(2)
    expect(state.currentPlayer).toBe('computer')
    expect(state.isComputerThinking).toBe(true)
    expect(state.history).toHaveLength(1)
  })

  it('rejects illegal user moves', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      piles: classic,
      mode: 'normal',
      difficulty: 'grandmaizer',
    })
    const before = state
    state = gameReducer(state, { type: 'USER_MOVE', pileId: 'pile-1', amount: 99 })
    expect(state).toEqual(before)
  })

  it('applies computer move', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      piles: classic,
      mode: 'normal',
      difficulty: 'grandmaizer',
    })
    state = gameReducer(state, { type: 'USER_MOVE', pileId: 'pile-1', amount: 1 })
    state = gameReducer(state, {
      type: 'COMPUTER_MOVE_RESOLVED',
      move: {
        pileId: 'pile-2',
        amountRemoved: 1,
        resultingSize: 4,
        player: 'computer',
      },
    })
    expect(state.currentPlayer).toBe('user')
    expect(state.isComputerThinking).toBe(false)
    expect(state.history).toHaveLength(2)
  })

  it('resets to initial piles', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      piles: classic,
      mode: 'normal',
      difficulty: 'grandmaizer',
    })
    state = gameReducer(state, { type: 'USER_MOVE', pileId: 'pile-1', amount: 1 })
    state = gameReducer(state, { type: 'RESET_GAME' })
    expect(state.piles).toEqual(classic)
    expect(state.history).toHaveLength(0)
    expect(state.currentPlayer).toBe('user')
  })

  it('toggles helper visibility', () => {
    const state = gameReducer(createInitialState(), { type: 'TOGGLE_HELPER' })
    expect(state.helperVisible).toBe(false)
  })
})
