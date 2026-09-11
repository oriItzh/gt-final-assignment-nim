import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { AppShell } from './components/layout/AppShell'
import { theme } from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell>
        <Typography variant="h4" gutterBottom>
          Game Theory Lab
        </Typography>
        <Typography color="text.secondary">
          Interactive Generalized Nim — Player vs. Computer
        </Typography>
      </AppShell>
    </ThemeProvider>
  )
}

export default App
