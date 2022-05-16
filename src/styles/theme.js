import { createTheme, responsiveFontSizes } from '@mui/material';
import { koKR } from '@mui/material/locale';

const commonPalette = {
  common: { black: 'rgba(27, 28, 29, 1)', white: '#ffffff' },
  primary: {
    light: 'rgba(75, 175, 221, 1)',
    main: 'rgba(8, 148, 215, 1)',
    dark: 'rgba(8, 131, 189, 1)',
    contrastText: '#ffffff',
  },
  secondary: {
    light: 'rgba(69, 203, 221, 1)',
    main: 'rgba(3, 191, 215, 1)',
    dark: 'rgba(2, 167, 189, 1)',
    contrastText: '#ffffff',
  },
  error: {
    light: 'rgba(242, 124, 131, 1)',
    main: 'rgba(239, 51, 64, 1)',
    dark: 'rgba(176, 37, 46, 1)',
    contrastText: '#ffffff',
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
  mode: 'dark',
};

const light = {
  ...commonPalette,
  background: { default: '#fffffe', paper: '#fffffe' },
  text: {
    primary: 'rgba(27, 28, 29, 1)',
    secondary: 'rgba(84, 84, 84, 1)',
    disabled: 'rgba(220, 221, 222, 1)',
    hint: 'rgba(209, 211, 212, 1)',
  },
  mode: 'light',
};

const components = {
  MuiInputLabel: {
    styleOverrides: {
      root: {
        lineHeight: '1em',
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        '&.MuiNativeSelect-root': {
          display: 'inline-flex',
          flexDirection: 'column',
          position: 'relative',
          minWidth: 0,
          padding: 0,
          // margin: 0,
          verticalAlign: 'top',
          // marginTop: '8px',
          // marginBottom: '4px',
          // border: '1px solid rgba(255,255,255,.12)',
          borderRadius: '4px',
          width: '100%',
          '& select': {
            font: 'inherit',
            letterSpacing: 'inherit',
            color: 'currentColor',
            border: 0,
            boxSizing: 'content-box',
            background: 'none',
            // height: '1.4375em',
            // margin: 0,
            '-webkit-tap-highlight-color': 'transparent',
            display: 'block',
            minWidth: 0,
            width: '100%',
            animationName: 'mui-auto-fill-cancel',
            animationDuration: '10ms',
            // padding: '8.5px 14px',
            // lineHeight: 1.75,
          },
          '&:before': {
            border: 'none',
          },
        },
      },
    },
  },
  MuiNativeSelect: {
    styleOverrides: {
      root: {
        border: '1px solid red',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      // root: {
      //   '&.Mui-focused': {
      //     '& .MuiOutlinedInput-notchedOutline': {
      //       borderColor: skyBlue[100],
      //     },
      //   },
      // },
      input: {
        // padding: '12.5px',
        // lineHeight: 1.75,
        padding: '10px 14px',
        '&::-webkit-calendar-picker-indicator': {
          filter: 'invert(1)',
        },
        '&.MuiSelect-select': {
          paddingTop: '10px',
          paddingBottom: '10px',
        },
      },
      notchedOutline: {
        borderColor: 'rgba(255,255,255,.12)',
        '& fieldset': {
          color: 'violet',
        },
      },
    },
  },
};

const themeType = (type) => {
  let theme = null;
  const themeObj = {
    typography,
    components,
  };
  if (type) {
    theme = createTheme(
      {
        palette: { ...dark },
        ...themeObj,
      },
      koKR,
    );
  } else {
    theme = createTheme({ palette: { ...light }, ...themeObj }, koKR);
  }
  theme = responsiveFontSizes(theme);
  return theme;
};

export default themeType;
