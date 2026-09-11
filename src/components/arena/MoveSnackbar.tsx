import { useEffect, useRef, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useGame } from '../../state/GameContext'

function pileNumberFromId(pileId: string): number {
  const match = pileId.match(/pile-(\d+)/)
  return match ? Number(match[1]) : 0
}

export function MoveSnackbar() {
  const { state } = useGame()
  const prevHistoryLength = useRef(0)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (state.history.length > prevHistoryLength.current && state.history.length > 0) {
      const move = state.history[state.history.length - 1]
      const pileNum = pileNumberFromId(move.pileId)
      const who = move.player === 'user' ? 'You' : 'Your opponent'
      const stickWord = move.amountRemoved === 1 ? 'stick' : 'sticks'
      setMessage(`${who} took ${move.amountRemoved} ${stickWord} from pile #${pileNum}`)
      setOpen(true)
    }
    prevHistoryLength.current = state.history.length
  }, [state.history])

  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="info"
        variant="filled"
        sx={{ width: '100%', fontWeight: 500 }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
