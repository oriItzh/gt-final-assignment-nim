import { Stack, Typography } from '@mui/material'
import { useGame } from '../../state/GameContext'
import { PileItem } from './PileItem'

interface PileListProps {
  highlightedPileId?: string | null
}

export function PileList({ highlightedPileId = null }: PileListProps) {
  const { state, dispatch } = useGame()

  const isInteractive =
    state.status === 'playing' &&
    state.currentPlayer === 'user' &&
    !state.isComputerThinking

  const handleRemove = (pileId: string, amount: number) => {
    dispatch({ type: 'USER_MOVE', pileId, amount })
  }

  if (state.status === 'setup') {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
        Click &quot;New Game&quot; to start playing.
      </Typography>
    )
  }

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      sx={{ flexWrap: 'wrap' }}
    >
      {state.piles.map((pile, index) => (
        <PileItem
          key={pile.id}
          pile={pile}
          index={index}
          disabled={!isInteractive}
          highlighted={highlightedPileId === pile.id}
          onRemove={handleRemove}
        />
      ))}
    </Stack>
  )
}
