import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { bitParity } from '../../core/binary'
import { useGame } from '../../state/GameContext'
import { BitColumnHeader } from './BitColumnHeader'

export function BinaryMatrixHUD() {
  const { derived, highlight } = useGame()
  const { binaryMatrix } = derived
  const columns = bitParity(binaryMatrix)

  if (binaryMatrix.rows.length === 0) {
    return null
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Binary Matrix
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Each row is a pile in binary. The XOR parity row shows which bits are odd.
        </Typography>

        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 320 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Pile</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Dec</TableCell>
                {columns.map((col) => (
                  <BitColumnHeader
                    key={col.bitIndex}
                    decimalValue={col.decimalValue}
                    bitIndex={col.bitIndex}
                    highlighted={highlight.bitIndex === col.bitIndex}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {binaryMatrix.rows.map((row, rowIndex) => {
                const pileNum = rowIndex + 1
                const isRowHighlighted = highlight.pileId === row.pileId
                return (
                  <TableRow
                    key={row.pileId}
                    sx={(theme) => ({
                      bgcolor: isRowHighlighted
                        ? alpha(theme.palette.warning.main, theme.palette.mode === 'dark' ? 0.15 : 0.12)
                        : 'transparent',
                      transition: 'background 0.2s ease',
                    })}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>#{pileNum}</TableCell>
                    <TableCell align="center">{row.size}</TableCell>
                    {row.bits.map((bit, colIndex) => {
                      const col = columns[colIndex]
                      const isBitHighlighted =
                        isRowHighlighted && highlight.bitIndex === col.bitIndex
                      return (
                        <TableCell
                          key={`${row.pileId}-${colIndex}`}
                          align="center"
                          sx={(theme) => ({
                            bgcolor: isBitHighlighted
                              ? alpha(theme.palette.warning.main, theme.palette.mode === 'dark' ? 0.2 : 0.15)
                              : 'transparent',
                          })}
                        >
                          <Chip
                            label={bit}
                            size="small"
                            color={bit === 1 ? 'primary' : 'default'}
                            variant={bit === 1 ? 'filled' : 'outlined'}
                            sx={{ minWidth: 32, fontWeight: 700 }}
                          />
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 700 }}>XOR</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  {derived.xorSum}
                </TableCell>
                {binaryMatrix.xorParityRow.map((parity, colIndex) => (
                  <TableCell key={`xor-${colIndex}`} align="center">
                    <Chip
                      label={parity}
                      size="small"
                      color={parity === 1 ? 'error' : 'success'}
                      variant="filled"
                      sx={{ minWidth: 32, fontWeight: 700 }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  )
}
