import { Card, CardContent, Stack, Typography } from '@mui/material'
import { ControlsBar } from '../arena/ControlsBar'
import { GameStatusBanner } from '../arena/GameStatusBanner'
import { PileList } from '../arena/PileList'
import { TurnIndicator } from '../arena/TurnIndicator'

export function GameContainer() {
  return (
    <Stack spacing={3} sx={{ mt: 2 }}>
      <ControlsBar />
      <TurnIndicator />
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Game Arena
          </Typography>
          <PileList />
        </CardContent>
      </Card>
      <GameStatusBanner />
    </Stack>
  )
}
