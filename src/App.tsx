import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { AppShell } from './components/layout/AppShell'
import { GameContainer } from './components/layout/GameContainer'
import { GameProvider } from './state/GameContext'
import { theme } from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <AppShell>
          <Typography variant="h4" gutterBottom>
            Generalized Nim
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}>
            Interactive Player vs. Computer — explore XOR strategy in real time.
          </Typography>
          <GameContainer />
        </AppShell>
      </GameProvider>
    </ThemeProvider>
  )
}

export default App
