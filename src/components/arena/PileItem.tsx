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
import { PileSticks } from './PileSticks'

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
  const clampedAmount = Math.min(Math.max(amount, 1), maxRemovable || 1)

  const handleSliderChange = (_: Event, value: number | number[]) => {
    setAmount(Math.max(1, value as number))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setAmount(Number.isNaN(value) ? 1 : value)
  }

  const handleRemove = () => {
    if (clampedAmount > 0 && clampedAmount <= pile.size) {
      onRemove(pile.id, clampedAmount)
      setAmount(1)
    }
  }

  return (
    <Card
      sx={{
        flex: '1 1 220px',
        maxWidth: 280,
        border: highlighted ? 2 : 1,
        borderColor: highlighted ? 'warning.main' : 'divider',
        bgcolor: highlighted ? 'warning.light' : 'background.paper',
        transition: 'all 0.25s ease',
        opacity: pile.size === 0 ? 0.55 : 1,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Pile #{index + 1}</Typography>
            <Chip label={`${pile.size} sticks`} color="primary" size="small" variant="outlined" />
          </Box>

          <PileSticks
            count={pile.size}
            pileIndex={index}
            selectedRemove={disabled ? 0 : clampedAmount}
          />

          {pile.size > 0 && (
            <>
              <Typography variant="caption" color="text.secondary">
                Select how many sticks to remove (highlighted in orange)
              </Typography>

              <Slider
                value={clampedAmount}
                min={1}
                max={maxRemovable}
                step={1}
                marks={maxRemovable <= 10}
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
                  sx={{ width: 96 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  disabled={disabled || clampedAmount < 1 || clampedAmount > pile.size}
                  onClick={handleRemove}
                >
                  Remove {clampedAmount}
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
