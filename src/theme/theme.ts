import { alpha, createTheme, type Theme } from '@mui/material/styles'

export type ThemeMode = 'light' | 'dark'

const sharedTypography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h4: { fontWeight: 700, letterSpacing: '-0.02em' },
  h5: { fontWeight: 700, letterSpacing: '-0.01em' },
  h6: { fontWeight: 600 },
  subtitle1: { fontWeight: 600 },
  button: { fontWeight: 600 },
}

const sharedShape = { borderRadius: 16 }

function componentOverrides(mode: ThemeMode): Theme['components'] {
  const isDark = mode === 'dark'
  const cardBorder = isDark ? alpha('#9B8CFF', 0.12) : alpha('#4F46E5', 0.1)
  const cardShadow = isDark
    ? '0 12px 40px rgba(0, 0, 0, 0.45)'
    : '0 10px 30px rgba(79, 70, 229, 0.08)'

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: isDark ? '#4B5563 #1A1D27' : '#C4B5FD #F3F4F6',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${cardBorder}`,
          boxShadow: cardShadow,
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          background: isDark
            ? 'linear-gradient(135deg, #7C6CF0 0%, #5B4FCF 100%)'
            : 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  }
}

export function createAppTheme(mode: ThemeMode): Theme {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#9B8CFF' : '#4F46E5',
        light: isDark ? '#2A2545' : '#EEF2FF',
        dark: isDark ? '#7C6CF0' : '#3730A3',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: isDark ? '#94A3B8' : '#64748B',
        light: isDark ? '#1E293B' : '#F1F5F9',
      },
      success: {
        main: isDark ? '#4ADE80' : '#16A34A',
        light: isDark ? '#14532D' : '#DCFCE7',
      },
      warning: {
        main: isDark ? '#FBBF24' : '#D97706',
        light: isDark ? '#422006' : '#FEF3C7',
      },
      error: {
        main: isDark ? '#F87171' : '#DC2626',
        light: isDark ? '#450A0A' : '#FEE2E2',
      },
      info: {
        main: isDark ? '#60A5FA' : '#2563EB',
        light: isDark ? '#1E3A5F' : '#DBEAFE',
      },
      background: {
        default: isDark ? '#0B0D12' : '#EEF2FF',
        paper: isDark ? '#141820' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F1F5F9' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#64748B',
      },
      divider: isDark ? alpha('#94A3B8', 0.16) : alpha('#4F46E5', 0.08),
    },
    shape: sharedShape,
    typography: sharedTypography,
    components: componentOverrides(mode),
  })
}

export function getStickColors(theme: Theme, marked: boolean) {
  if (marked) {
    return {
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(90deg, #FCD34D 0%, #F59E0B 100%)'
        : 'linear-gradient(90deg, #FDE68A 0%, #F59E0B 100%)',
      boxShadow: `0 2px 8px ${alpha(theme.palette.warning.main, 0.45)}`,
    }
  }
  return {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #A78BFA 0%, #7C3AED 100%)'
      : 'linear-gradient(90deg, #A5B4FC 0%, #4F46E5 100%)',
    boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.35)}`,
  }
}
