import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  type SelectChangeEvent,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { CLASSIC_PILE_SIZES, pilesFromSizes } from '../../core/random'
import { useGame } from '../../state/GameContext'
import type { Difficulty, GameMode } from '../../types/game'

export function ControlsBar() {
  const { state, dispatch, startGame } = useGame()

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    dispatch({ type: 'SET_DIFFICULTY', difficulty: event.target.value as Difficulty })
  }

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, value: GameMode | null) => {
    if (value) {
      dispatch({ type: 'SET_MODE', mode: value })
    }
  }

  const handleNewGame = () => {
    startGame(
      pilesFromSizes(CLASSIC_PILE_SIZES),
      state.mode,
      state.difficulty,
    )
  }

  const handleReset = () => {
    dispatch({ type: 'RESET_GAME' })
  }

  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ flexWrap: 'wrap', alignItems: { md: 'center' }, justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={handleNewGame}>
              New Game
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
              disabled={state.status !== 'playing'}
            >
              Reset
            </Button>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'center' } }}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="difficulty-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-label"
                label="Difficulty"
                value={state.difficulty}
                onChange={handleDifficultyChange}
              >
                <MenuItem value="grandmaster">Grandmaster</MenuItem>
                <MenuItem value="adaptive">Adaptive</MenuItem>
                <MenuItem value="novice">Novice</MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup
              exclusive
              size="small"
              value={state.mode}
              onChange={handleModeChange}
              aria-label="play rules"
            >
              <ToggleButton value="normal">Normal</ToggleButton>
              <ToggleButton value="misere">Misère</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
