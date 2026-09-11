import { useEffect, useRef, useState } from 'react'
import { Box, keyframes, useTheme } from '@mui/material'
import { getStickColors } from '../../theme/theme'

const STICKS_PER_COLUMN = 12

function getStickDimensions(stickCount: number) {
  if (stickCount <= 5) {
    return { width: 56, height: 10, gap: 4, columnGap: 1 }
  }
  if (stickCount <= 12) {
    return { width: 48, height: 7, gap: 3, columnGap: 0.75 }
  }
  if (stickCount <= 30) {
    return { width: 40, height: 5, gap: 2, columnGap: 0.75 }
  }
  return { width: 32, height: 4, gap: 2, columnGap: 0.75 }
}

const stickRemove = keyframes`
  0% { opacity: 1; transform: translateY(0) scaleY(1); }
  100% { opacity: 0; transform: translateY(-10px) scaleY(0.4); }
`

interface PileSticksProps {
  count: number
  pileIndex: number
  selectedRemove?: number
}

function groupIntoColumns(total: number): number[][] {
  const columns: number[][] = []
  for (let i = 0; i < total; i++) {
    const col = Math.floor(i / STICKS_PER_COLUMN)
    if (!columns[col]) columns[col] = []
    columns[col].push(i)
  }
  return columns
}

export function PileSticks({ count, pileIndex, selectedRemove = 0 }: PileSticksProps) {
  const theme = useTheme()
  const prevCountRef = useRef(count)
  const [exitingCount, setExitingCount] = useState(0)

  useEffect(() => {
    if (count < prevCountRef.current) {
      const removed = prevCountRef.current - count
      setExitingCount(removed)
      const timer = setTimeout(() => setExitingCount(0), 450)
      prevCountRef.current = count
      return () => clearTimeout(timer)
    }
    prevCountRef.current = count
  }, [count])

  const totalVisible = count + exitingCount
  const markedForRemoval = selectedRemove > 0 ? Math.min(selectedRemove, count) : 0
  const columns = groupIntoColumns(totalVisible)
  const { width: stickWidth, height: stickHeight, gap: stickGap, columnGap } =
    getStickDimensions(count)

  const isStickMarked = (index: number) =>
    index < count && index >= count - markedForRemoval

  const isStickExiting = (index: number) => index >= count

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: columnGap,
        width: '100%',
        minHeight: 48,
        px: 1.5,
        py: 1.5,
        borderRadius: 3,
        bgcolor: (t) =>
          t.palette.mode === 'dark'
            ? 'rgba(155, 140, 255, 0.06)'
            : 'rgba(79, 70, 229, 0.05)',
        border: 1,
        borderColor: 'divider',
        borderStyle: 'dashed',
      }}
      aria-label={`Pile ${pileIndex + 1} with ${count} sticks`}
    >
      {totalVisible === 0 ? (
        <Box sx={{ color: 'text.disabled', fontSize: 12 }}>Empty</Box>
      ) : (
        columns.map((stickIndices, colIndex) => (
          <Box
            key={`${pileIndex}-col-${colIndex}`}
            sx={{
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              gap: `${stickGap}px`,
            }}
          >
            {stickIndices.map((stickIndex) => {
              const isMarked = isStickMarked(stickIndex)
              const isExiting = isStickExiting(stickIndex)
              const stickStyle = getStickColors(theme, isMarked)

              return (
                <Box
                  key={`${pileIndex}-stick-${stickIndex}-${isExiting ? 'exit' : 'stay'}`}
                  sx={{
                    width: stickWidth,
                    height: stickHeight,
                    borderRadius: Math.max(2, stickHeight / 2),
                    flexShrink: 0,
                    background: stickStyle.background,
                    boxShadow: stickStyle.boxShadow,
                    transformOrigin: 'center bottom',
                    animation: isExiting ? `${stickRemove} 0.45s ease-in forwards` : 'none',
                    transition: 'background 0.2s ease, box-shadow 0.2s ease, width 0.2s ease, height 0.2s ease',
                  }}
                />
              )
            })}
          </Box>
        ))
      )}
    </Box>
  )
}
