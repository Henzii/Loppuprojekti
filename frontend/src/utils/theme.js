import { createTheme } from '@mui/material/styles';

const Breakpoint = '@media screen and (min-width: 900px)';

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#34568B',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          paddingLeft: '10px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          [Breakpoint]: {
            fontSize: '1.7vw',
            margin: '0px',
          },
        },
        subheader: {
          margin: '0px',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          [Breakpoint]: {
            fontSize: '1.2rem',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '300px',
          fontSize: 'large',
          // backgroundColor: 'black',
        },
      },
      defaultProps: {
        color: 'info',
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: '10px 0px',
        },
        paragraph: {
          margin: '4rem 0px',
          fontSize: '1.2em',
          [Breakpoint]: {
            fontSize: '1.2vw',
          },
        },
        h1: {
          fontSize: '2.5rem',
          [Breakpoint]: {
            fontSize: '4vw',
          },
        },
        h2: {
          fontSize: '2.3rem',
          [Breakpoint]: {
            fontSize: '3vw',
          },
        },
        h3: {
          fontSize: '1.6rem',
          [Breakpoint]: {
            fontSize: '2vw',
          },
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
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '.6em',
          [Breakpoint]: {
            fontSize: '1.2em',
          },
        },
      },
    },
  },
});

export default theme;
