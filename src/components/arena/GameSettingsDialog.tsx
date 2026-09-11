import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import { pilesFromSizes, randomPileSizes } from '../../core/random'
import { useGame } from '../../state/GameContext'

const MIN_PILES = 2
const MAX_PILES = 7
const MIN_STICKS = 1
const MAX_STICKS = 100

interface GameSettingsDialogProps {
  open: boolean
  onClose: () => void
}

export function GameSettingsDialog({ open, onClose }: GameSettingsDialogProps) {
  const { state, startGame } = useGame()
  const [sizes, setSizes] = useState<number[]>([3, 5, 7])

  useEffect(() => {
    if (open) {
      setSizes(state.initialPiles.map((p) => p.size))
    }
  }, [open, state.initialPiles])

  const handleRandomize = () => {
    setSizes(randomPileSizes(sizes.length, MIN_STICKS, MAX_STICKS))
  }

  const handleSizeChange = (index: number, value: string) => {
    const num = Number(value)
    setSizes((prev) =>
      prev.map((s, i) => (i === index ? (Number.isNaN(num) ? s : num) : s)),
    )
  }

  const handleAddPile = () => {
    if (sizes.length < MAX_PILES) {
      setSizes((prev) => [...prev, MIN_STICKS])
    }
  }

  const handleRemovePile = () => {
    if (sizes.length > MIN_PILES) {
      setSizes((prev) => prev.slice(0, -1))
    }
  }

  const handleStart = () => {
    const clamped = sizes.map((s) =>
      Math.min(MAX_STICKS, Math.max(MIN_STICKS, Math.round(s))),
    )
    startGame(pilesFromSizes(clamped), state.mode, state.difficulty)
    onClose()
  }

  const isValid = sizes.every((s) => s >= MIN_STICKS && s <= MAX_STICKS)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Game Setup</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Set each pile between {MIN_STICKS} and {MAX_STICKS} sticks, or randomize all at once.
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ShuffleIcon />}
          onClick={handleRandomize}
          sx={{ mb: 2 }}
        >
          Randomize (1–100 per pile)
        </Button>

        <Stack spacing={1.5}>
          {sizes.map((size, index) => (
            <TextField
              key={index}
              label={`Pile #${index + 1}`}
              type="number"
              size="small"
              value={size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
              slotProps={{ htmlInput: { min: MIN_STICKS, max: MAX_STICKS } }}
              fullWidth
            />
          ))}
        </Stack>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <IconButton
            onClick={handleRemovePile}
            disabled={sizes.length <= MIN_PILES}
            aria-label="remove pile"
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body2" sx={{ alignSelf: 'center' }}>
            {sizes.length} piles
          </Typography>
          <IconButton
            onClick={handleAddPile}
            disabled={sizes.length >= MAX_PILES}
            aria-label="add pile"
          >
            <AddIcon />
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleStart} disabled={!isValid}>
          Start Game
        </Button>
      </DialogActions>
    </Dialog>
  )
}
