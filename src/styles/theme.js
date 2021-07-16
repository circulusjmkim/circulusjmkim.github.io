import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { koKR } from '@material-ui/core/locale';

const commonPalette = {
  common: { black: 'rgba(27, 28, 29, 1)', white: '#fff' },
  primary: {
    light: 'rgba(75, 175, 221, 1)',
    main: 'rgba(8, 148, 215, 1)',
    dark: 'rgba(8, 131, 189, 1)',
    contrastText: '#fff',
  },
  secondary: {
    light: 'rgba(69, 203, 221, 1)',
    main: 'rgba(3, 191, 215, 1)',
    dark: 'rgba(2, 167, 189, 1)',
    contrastText: '#fff',
  },
  error: {
    light: 'rgba(242, 124, 131, 1)',
    main: 'rgba(239, 51, 64, 1)',
    dark: 'rgba(176, 37, 46, 1)',
    contrastText: '#fff',
  },
};

const typography = {
  fontFamily: [
    'Noto Sans SC',
    'Lato',
    '-apple-system',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  fontWeightLight: 300,
  fontWeightRegular: 500,
  fontWeightMedium: 700,
  fontWeightBold: 800,
  h1: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: 'bold',
  },
  h3: {
    fontWeight: 'bold',
  },
  h4: {
    fontWeight: 'bold',
  },
  h5: {
    fontWeight: 'bold',
  },
  h6: {
    fontWeight: 'bold',
  },
};

const dark = {
  ...commonPalette,
  type: 'dark',
};

const light = {
  ...commonPalette,
  text: {
    primary: 'rgba(27, 28, 29, 1)',
    secondary: 'rgba(84, 84, 84, 1)',
    disabled: 'rgba(220, 221, 222, 1)',
    hint: 'rgba(209, 211, 212, 1)',
  },
  type: 'light',
};

const themeType = (type) => {
  let theme = null;
  const themeObj = {
    typography,
  }
  if (type) {
    theme = createTheme({
      palette: { ...dark },
      ...themeObj,
    }, koKR);
  } else {
    theme = createTheme({ palette: { ...light }, ...themeObj }, koKR);
  }
  theme = responsiveFontSizes(theme);
  return theme;
};

export default themeType;
