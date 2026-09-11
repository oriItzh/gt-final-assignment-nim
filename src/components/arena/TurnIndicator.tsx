import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { ThinkingLoader } from '../common/ThinkingLoader'
import { useGame } from '../../state/GameContext'

export function TurnIndicator() {
  const { state, derived } = useGame()

  if (state.status !== 'playing') {
    return null
  }

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(155, 140, 255, 0.1)'
            : 'primary.light',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ py: '12px !important' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
        >
          {state.isComputerThinking ? (
            <ThinkingLoader />
          ) : (
            <Chip
              icon={state.currentPlayer === 'user' ? <PersonIcon /> : <SmartToyIcon />}
              label={state.currentPlayer === 'user' ? 'Your Turn' : "Computer's Turn"}
              color={state.currentPlayer === 'user' ? 'primary' : 'default'}
              variant="filled"
              sx={{ fontWeight: 600 }}
            />
          )}
          <Typography variant="body2" color="text.secondary">
            XOR = {derived.xorSum} · Position: {derived.hint.position}-position
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
