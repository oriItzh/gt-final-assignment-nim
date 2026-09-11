import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { ControlsBar } from '../arena/ControlsBar'
import { GameStatusBanner } from '../arena/GameStatusBanner'
import { MoveSnackbar } from '../arena/MoveSnackbar'
import { ThinkingSnackbar } from '../arena/ThinkingSnackbar'
import { PileList } from '../arena/PileList'
import { TurnIndicator } from '../arena/TurnIndicator'
import { BinaryMatrixHUD } from '../lab/BinaryMatrixHUD'
import { XorHelperCard } from '../lab/XorHelperCard'

export function GameContainer() {
  return (
    <>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <ControlsBar />
        <TurnIndicator />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Game Arena
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Remove sticks from a single pile on your turn. Last to move wins (Normal) or loses (Misère).
                </Typography>
                <PileList />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={2}>
              <BinaryMatrixHUD />
              <XorHelperCard />
            </Stack>
          </Grid>
        </Grid>

        <GameStatusBanner />
      </Stack>
      <ThinkingSnackbar />
      <MoveSnackbar />
    </>
  )
}
