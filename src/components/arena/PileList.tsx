import { Box, Typography } from '@mui/material'
import { useGame } from '../../state/GameContext'
import { PileItem } from './PileItem'

export function PileList() {
  const { state, dispatch, highlight } = useGame()

  const isInteractive =
    state.status === 'playing' &&
    state.currentPlayer === 'user' &&
    !state.isComputerThinking

  const handleRemove = (pileId: string, amount: number) => {
    dispatch({ type: 'USER_MOVE', pileId, amount })
  }

  if (state.status === 'setup') {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: 'center',
          borderRadius: 3,
          bgcolor: 'action.hover',
          border: 1,
          borderColor: 'divider',
          borderStyle: 'dashed',
        }}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Ready to play?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click &quot;New Game&quot; to configure piles and start playing.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      {state.piles.map((pile, index) => (
        <PileItem
          key={pile.id}
          pile={pile}
          index={index}
          disabled={!isInteractive}
          highlighted={highlight.pileId === pile.id}
          onRemove={handleRemove}
        />
      ))}
    </Box>
  )
}
