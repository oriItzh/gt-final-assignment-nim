import { Box, Typography } from '@mui/material'
import type { HelperHint } from '../../types/helper'

interface HintExplanationStepperProps {
  hint: HelperHint
}

export function HintExplanationStepper({ hint }: HintExplanationStepperProps) {
  return (
    <Box component="ol" sx={{ pl: 2.5, m: 0 }}>
      {hint.explanationSteps.map((step, index) => (
        <Typography
          key={index}
          component="li"
          variant="body2"
          sx={{ mb: 1.5, lineHeight: 1.6 }}
        >
          {step}
        </Typography>
      ))}
    </Box>
  )
}
