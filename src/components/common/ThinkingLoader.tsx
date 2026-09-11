import { Box, CircularProgress, Typography } from '@mui/material'

export function ThinkingLoader() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CircularProgress size={18} />
      <Typography variant="body2" color="text.secondary">
        Computer is thinking…
      </Typography>
    </Box>
  )
}
