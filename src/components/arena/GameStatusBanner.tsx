import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useGame } from '../../state/GameContext'

export function GameStatusBanner() {
  const { state, startGame } = useGame()

  const isGameOver = state.status === 'user-won' || state.status === 'computer-won'
  const userWon = state.status === 'user-won'

  const handlePlayAgain = () => {
    startGame(state.initialPiles, state.mode, state.difficulty)
  }

  if (!isGameOver) {
    return null
  }

  return (
    <>
      <Alert
        severity={userWon ? 'success' : 'error'}
        sx={{ mt: 2 }}
        action={
          <Button color="inherit" size="small" onClick={handlePlayAgain}>
            Play Again
          </Button>
        }
      >
        {userWon ? 'You win!' : 'Computer wins!'}
        {' '}({state.history.length} moves played)
      </Alert>

      <Dialog open={isGameOver} onClose={handlePlayAgain}>
        <DialogTitle>{userWon ? 'Victory!' : 'Defeat'}</DialogTitle>
        <DialogContent>
          <Typography>
            {userWon
              ? 'You made the last winning move.'
              : 'The computer made the last winning move.'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Total moves: {state.history.length} · Mode: {state.mode}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePlayAgain} variant="contained">
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
