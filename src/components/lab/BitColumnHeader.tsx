import { alpha, TableCell, Typography } from '@mui/material'

interface BitColumnHeaderProps {
  decimalValue: number
  bitIndex: number
  highlighted?: boolean
}

export function BitColumnHeader({ decimalValue, bitIndex, highlighted = false }: BitColumnHeaderProps) {
  return (
    <TableCell
      align="center"
      sx={(theme) => ({
        bgcolor: highlighted
          ? alpha(theme.palette.warning.main, theme.palette.mode === 'dark' ? 0.2 : 0.15)
          : alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.1),
        fontWeight: 700,
        borderBottom: 2,
        borderColor: highlighted ? 'warning.main' : 'primary.main',
      })}
    >
      <Typography variant="caption" sx={{ display: 'block', fontWeight: 700 }}>
        2^{bitIndex}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>
        {decimalValue}
      </Typography>
    </TableCell>
  )
}
