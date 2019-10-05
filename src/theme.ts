import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});

export default theme;

// A theme for testing that all components use proper themeing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hotPinktheme = createMuiTheme({
  palette: {
    common: {
      black: '#ff69b4',
      white: '#ff69b4',
    },
    primary: {
      light: '#ff69b4',
      dark: '#ff69b4',
      main: '#ff69b4',
      contrastText: '#ff69b4',
    },
    secondary: {
      light: '#ff69b4',
      dark: '#ff69b4',
      main: '#ff69b4',
      contrastText: '#ff69b4',
    },
    error: {
      light: '#ff69b4',
      dark: '#ff69b4',
      main: '#ff69b4',
      contrastText: '#ff69b4',
    },
    grey: {
      50: '#ff69b4',
      100: '#ff69b4',
      200: '#ff69b4',
      300: '#ff69b4',
      400: '#ff69b4',
      500: '#ff69b4',
      600: '#ff69b4',
      700: '#ff69b4',
      800: '#ff69b4',
      900: '#ff69b4',
      A100: '#ff69b4',
      A200: '#ff69b4',
      A400: '#ff69b4',
      A700: '#ff69b4',
    },
    text: {
      primary: '#ff69b4',
      secondary: '#ff69b4',
      hint: '#ff69b4',
    },
    divider: '#ff69b4',
    background: {
      paper: '#ff69b4',
      default: '#ff69b4',
    },
    action: {
      active: '#ff69b4',
      hover: '#ff69b4',
      selected: '#ff69b4',
      disabled: '#ff69b4',
      disabledBackground: '#ff69b4',
    },
  },
});
