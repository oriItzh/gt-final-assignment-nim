import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { Pile } from '../../types/game'

interface PileItemProps {
  pile: Pile
  index: number
  disabled: boolean
  highlighted?: boolean
  onRemove: (pileId: string, amount: number) => void
}

export function PileItem({ pile, index, disabled, highlighted = false, onRemove }: PileItemProps) {
  const [amount, setAmount] = useState(1)

  const maxRemovable = pile.size
  const clampedAmount = Math.min(Math.max(amount, 0), maxRemovable)

  const handleSliderChange = (_: Event, value: number | number[]) => {
    setAmount(value as number)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setAmount(Number.isNaN(value) ? 0 : value)
  }

  const handleRemove = () => {
    if (clampedAmount > 0 && clampedAmount <= pile.size) {
      onRemove(pile.id, clampedAmount)
      setAmount(1)
    }
  }

  if (pile.size === 0) {
    return (
      <Card sx={{ opacity: 0.5, minWidth: 180 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Pile {index + 1}
          </Typography>
          <Typography variant="body2">Empty</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        minWidth: 200,
        border: highlighted ? 2 : 0,
        borderColor: 'warning.main',
        transition: 'border-color 0.2s ease',
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Pile {index + 1}
            </Typography>
            <Chip label={pile.size} color="primary" size="small" />
          </Box>

          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            {Array.from({ length: pile.size }, (_, i) => (
              <Box
                key={i}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  opacity: 0.85,
                }}
              />
            ))}
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Remove tokens
          </Typography>

          <Slider
            value={clampedAmount}
            min={0}
            max={maxRemovable}
            step={1}
            marks
            disabled={disabled}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            aria-label={`Remove amount from pile ${index + 1}`}
          />

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TextField
              type="number"
              size="small"
              label="Amount"
              value={clampedAmount}
              onChange={handleInputChange}
              disabled={disabled}
              slotProps={{ htmlInput: { min: 1, max: maxRemovable } }}
              sx={{ width: 90 }}
            />
            <Button
              variant="contained"
              size="small"
              disabled={disabled || clampedAmount < 1 || clampedAmount > pile.size}
              onClick={handleRemove}
            >
              Remove
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
