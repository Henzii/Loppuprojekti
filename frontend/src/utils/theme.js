import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand',
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
          '@media screen and (min-width: 800px)': {
            fontSize: '1.7vw',
            margin: '0px',
          },
        },
        subheader: {
          margin: '0px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: '10px 0px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '20px 0px',
        },
      },
    },
  },
});

export default theme;
