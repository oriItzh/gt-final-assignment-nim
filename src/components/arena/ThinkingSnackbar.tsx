import { Alert, Snackbar } from '@mui/material'
import { useGame } from '../../state/GameContext'

export function ThinkingSnackbar() {
  const { state } = useGame()

  return (
    <Snackbar
      open={state.isComputerThinking}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="info" variant="filled" sx={{ fontWeight: 600, fontSize: 15 }}>
        Oponent is thinking... 🧠
      </Alert>
    </Snackbar>
  )
}
