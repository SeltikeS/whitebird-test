import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Soft sky blue
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: '#121212',
    },
    secondary: {
      main: '#f48fb1', // Soft pink
      light: '#f8bbd0',
      dark: '#c2185b',
      contrastText: '#121212',
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Slightly lighter for cards/panels
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Light gray text
    },
    divider: '#373737',
    action: {
      hover: 'rgba(144, 202, 249, 0.08)', // subtle hover highlight with primary blue
      selected: 'rgba(144, 202, 249, 0.16)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      focus: 'rgba(144, 202, 249, 0.24)',
    },
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif`,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 8px rgba(144, 202, 249, 0.5)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // borderRadius: 12,
          boxShadow:
            '0 4px 12px rgba(0,0,0,0.7), 0 0 2px rgba(144, 202, 249, 0.3)',
        },
      },
    },
  },
});

export default theme;
