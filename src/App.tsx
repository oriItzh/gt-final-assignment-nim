import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { GameSmokePanel } from './components/common/GameSmokePanel'
import { AppShell } from './components/layout/AppShell'
import { GameProvider } from './state/GameContext'
import { theme } from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <AppShell>
          <Typography variant="h4" gutterBottom>
            Game Theory Lab
          </Typography>
          <Typography color="text.secondary">
            Interactive Generalized Nim — Player vs. Computer
          </Typography>
          <GameSmokePanel />
        </AppShell>
      </GameProvider>
    </ThemeProvider>
  )
}

export default App
