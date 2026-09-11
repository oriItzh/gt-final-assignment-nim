import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { pilesFromSizes } from '../../core/random'
import { GameProvider, useGame } from '../GameContext'

function TestHarness() {
  const { state, dispatch, startGame } = useGame()
  return (
    <div>
      <span data-testid="status">{state.status}</span>
      <span data-testid="player">{state.currentPlayer}</span>
      <span data-testid="thinking">{String(state.isComputerThinking)}</span>
      <span data-testid="history">{state.history.length}</span>
      <button type="button" onClick={() => startGame(pilesFromSizes([3, 5, 7]), 'normal', 'grandmaster')}>
        start
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: 'USER_MOVE', pileId: 'pile-1', amount: 1 })}
      >
        move
      </button>
    </div>
  )
}

describe('GameContext', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('schedules computer move after user move', async () => {
    vi.useFakeTimers()

    render(
      <GameProvider>
        <TestHarness />
      </GameProvider>,
    )

    await act(async () => {
      screen.getByText('start').click()
    })
    expect(screen.getByTestId('status').textContent).toBe('playing')

    await act(async () => {
      screen.getByText('move').click()
    })
    expect(screen.getByTestId('player').textContent).toBe('computer')
    expect(screen.getByTestId('thinking').textContent).toBe('true')

    await act(async () => {
      vi.advanceTimersByTime(800)
    })

    expect(screen.getByTestId('player').textContent).toBe('user')
    expect(screen.getByTestId('thinking').textContent).toBe('false')
    expect(Number(screen.getByTestId('history').textContent)).toBe(2)
  })
})
