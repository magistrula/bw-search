import { createTheme } from '@mui/material/styles';

export default createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          bodySmall: 'div',
          bodyBold: 'div',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          minWidth: 'auto',
        },
      },
    },
  },
  typography: {
    bodySmall: {
      fontSize: '0.875rem',
    },
    bodyBold: {
      fontWeight: 500,
    },
  },
});
