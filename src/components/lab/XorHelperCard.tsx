import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import { useState } from 'react'
import { useGame } from '../../state/GameContext'
import { HintExplanationStepper } from './HintExplanationStepper'

export function XorHelperCard() {
  const { derived, setHighlight, clearHighlight } = useGame()
  const { hint } = derived
  const [expanded, setExpanded] = useState(true)
  const [hintRevealed, setHintRevealed] = useState(false)

  const isWinning = hint.position === 'N'

  const handleShowHint = () => {
    setHintRevealed(true)
    if (hint.recommendedPileId) {
      setHighlight(hint.recommendedPileId, hint.msbIndex)
    }
  }

  const handleHideHint = () => {
    setHintRevealed(false)
    clearHighlight()
  }

  return (
    <Card>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <LightbulbIcon color="primary" />
            <Typography variant="h6">XOR Helper</Typography>
          </Stack>
          <IconButton
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label="toggle helper"
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Stack>

        <Collapse in={expanded}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={isWinning ? 'Winning Position (𝒩)' : 'Losing Position (𝒫)'}
                color={isWinning ? 'success' : 'warning'}
                variant="filled"
              />
              <Chip label={`XOR = ${hint.xorSum}`} variant="outlined" />
              {hint.msbIndex !== null && (
                <Chip label={`MSB: bit ${hint.msbIndex}`} variant="outlined" size="small" />
              )}
            </Box>

            {hint.recommendedPileId && hint.targetSize !== null && (
              <Typography variant="body2" color="text.secondary">
                Recommended: reduce pile #{hint.recommendedPileId.replace('pile-', '')} to{' '}
                {hint.targetSize} sticks.
              </Typography>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                onClick={handleShowHint}
                disabled={!isWinning || !hint.recommendedPileId}
              >
                Show Hint
              </Button>
              {hintRevealed && (
                <Button variant="text" size="small" onClick={handleHideHint}>
                  Clear Highlight
                </Button>
              )}
            </Stack>

            <Collapse in={hintRevealed}>
              <HintExplanationStepper hint={hint} />
            </Collapse>
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  )
}
