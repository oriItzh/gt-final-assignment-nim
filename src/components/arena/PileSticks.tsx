import { useEffect, useRef, useState } from 'react'
import { Box, keyframes } from '@mui/material'

const stickRemove = keyframes`
  0% { opacity: 1; transform: translateX(0) scaleX(1); }
  100% { opacity: 0; transform: translateX(28px) scaleX(0.3); }
`

interface PileSticksProps {
  count: number
  pileIndex: number
  selectedRemove?: number
}

export function PileSticks({ count, pileIndex, selectedRemove = 0 }: PileSticksProps) {
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 0.5,
        width: '100%',
        minHeight: 48,
        px: 1.5,
        py: 1.5,
        borderRadius: 3,
        bgcolor: 'rgba(79, 55, 139, 0.04)',
        border: '1px dashed rgba(79, 55, 139, 0.15)',
      }}
      aria-label={`Pile ${pileIndex + 1} with ${count} sticks`}
    >
      {Array.from({ length: totalVisible }, (_, i) => {
        const isExiting = i >= count
        const isMarked = !isExiting && i >= count - markedForRemoval

        return (
          <Box
            key={`${pileIndex}-stick-${i}-${isExiting ? 'exit' : 'stay'}`}
            sx={{
              width: 32,
              height: 12,
              borderRadius: 6,
              flexShrink: 0,
              background: isMarked
                ? 'linear-gradient(90deg, #FFB74D 0%, #F57C00 100%)'
                : 'linear-gradient(90deg, #B39DDB 0%, #4F378B 100%)',
              boxShadow: isMarked
                ? '0 2px 8px rgba(245, 124, 0, 0.4)'
                : '0 2px 6px rgba(79, 55, 139, 0.25)',
              transformOrigin: 'center right',
              animation: isExiting ? `${stickRemove} 0.45s ease-in forwards` : 'none',
              transition: 'background 0.2s ease, box-shadow 0.2s ease',
            }}
          />
        )
      })}
      {totalVisible === 0 && (
        <Box sx={{ color: 'text.disabled', fontSize: 12 }}>Empty</Box>
      )}
    </Box>
  )
}
