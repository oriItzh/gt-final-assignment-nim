import { Chip, Stack } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { ThinkingLoader } from '../common/ThinkingLoader'
import { useGame } from '../../state/GameContext'

export function TurnIndicator() {
  const { state } = useGame()

  if (state.status !== 'playing') {
    return null
  }

  if (state.isComputerThinking) {
    return <ThinkingLoader />
  }

  const isUserTurn = state.currentPlayer === 'user'

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={isUserTurn ? <PersonIcon /> : <SmartToyIcon />}
        label={isUserTurn ? 'Your Turn' : "Computer's Turn"}
        color={isUserTurn ? 'primary' : 'default'}
        variant={isUserTurn ? 'filled' : 'outlined'}
      />
    </Stack>
  )
}
