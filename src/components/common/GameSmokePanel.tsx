import { Button, Chip, Stack, Typography } from '@mui/material'
import { pilesFromSizes } from '../../core/random'
import { useGame } from '../../state/GameContext'

export function GameSmokePanel() {
  const { state, dispatch, derived, startGame } = useGame()

  const handleStart = () => {
    startGame(pilesFromSizes([3, 5, 7]), 'normal', 'grandmaster')
  }

  const handleUserMove = () => {
    const pile = state.piles.find((p) => p.size > 0)
    if (pile) {
      dispatch({ type: 'USER_MOVE', pileId: pile.id, amount: 1 })
    }
  }

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="body1">Status: {state.status}</Typography>
        <Chip
          label={
            state.isComputerThinking
              ? 'Computer thinking…'
              : state.currentPlayer === 'user'
                ? 'Your turn'
                : "Computer's turn"
          }
          color={state.currentPlayer === 'user' ? 'primary' : 'default'}
        />
        <Chip label={`XOR: ${derived.xorSum}`} size="small" />
        <Chip label={`Position: ${derived.hint.position}`} size="small" />
      </Stack>

      <Typography variant="body2">
        Piles: {state.piles.map((p) => `${p.id}=${p.size}`).join(', ')}
      </Typography>

      <Stack direction="row" spacing={1}>
        {state.status === 'setup' && (
          <Button variant="contained" onClick={handleStart}>
            Start Game
          </Button>
        )}
        {state.status === 'playing' && state.currentPlayer === 'user' && !state.isComputerThinking && (
          <Button variant="outlined" onClick={handleUserMove}>
            Remove 1 (smoke test)
          </Button>
        )}
        {state.status === 'playing' && (
          <Button variant="text" onClick={() => dispatch({ type: 'RESET_GAME' })}>
            Reset
          </Button>
        )}
      </Stack>
    </Stack>
  )
}
