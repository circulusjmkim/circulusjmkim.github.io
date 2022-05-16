/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import { lighten, Tab, Tabs } from '@mui/material';
import { grey } from '@mui/material/colors';

import BgLogo from '../assets/bg_logo.png';

const tagLabel = (theme) => ({
  '& span': {
    padding: theme.spacing(0.5, 1),
    fontSize: theme.typography.pxToRem(12),
    borderRadius: 3,
    fontWeight: 'bold',
  },
  // 옐로
  '& .label__status-0, .label__status-100': {
    color: '#FFCC00',
    background: 'rgba(255, 204, 0, .08)',
  },
  // 그린
  '& .label__status-101': {
    color: '#4CD964',
    background: 'rgba(76, 217, 100, .08)',
  },
  // 레드
  '& .label__status--101, .label__status--199, .label__status--1, .label__status--222, .label__status--299':
    {
      color: '#FF3B30',
      background: 'rgba(255, 59, 48, .08)',
    },
  // 퍼플
  '& .label__status-3': {
    color: '#6765ff',
    background: 'rgba(103, 101, 255, .08)',
  },
  // 블루
  '& .label__status-111, .label__status-1, .label__status-200, .label__status-201, .label__status-202':
    {
      color: '#007AFF',
      background: 'rgba(0, 122, 255, .08)',
    },
  // 그레이
  '& .label__status-222': {
    color: '#8e8e93',
    background: 'rgba(142, 142, 147, .08)',
  },
});

const stepper = (theme) => ({
  '& .MuiStepIcon-active .MuiStepIcon-text': {
    fontWeight: 'bold',
  },
  '& .MuiSvgIcon-root': {
    fontFamily: 'NanumGothic',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  '& .MuiStepConnector-vertical': {
    minHeight: theme.spacing(6),
    marginLeft: theme.spacing(2.5),
    padding: 0,
  },
  '& .MuiStepConnector-lineVertical': {
    minHeight: theme.spacing(6),
  },
  '& .MuiStepLabel-label': {
    fontSize: '1.142em',
    fontWeight: 'bold',
  },
});

const useDashBoardStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  toolbarRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableContainer: {
    padding: theme.spacing(1),
  },
  table: {
    width: 'max-content',
    minWidth: '100%',
  },
  paper: {
    width: '100%',
  },
  newProject: {
    background: theme.palette.primary.main,
    height: '100%',
    padding: theme.spacing(3),
    '& .MuiCardContent-root': {
      height: '100%',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'row',
    },
    '& .MuiTypography-root': {
      textAlign: 'left',
      marginRight: theme.spacing(2),
      wordBreak: 'keep-all',
    },
  },
  currentCard: {
    '& .MuiCardContent-root': {
      padding: theme.spacing(3),
      fontSize: theme.typography.pxToRem(16),
      '& > .MuiTypography-h6': {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.primary.main,
        lineHeight: theme.typography.pxToRem(24),
      },
      '& .MuiBox-root': {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        minHeight: theme.spacing(4),
        '& > .MuiTypography-h6': {
          marginRight: theme.spacing(1),
        },
      },
    },
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
}));

const useBotSelectStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  completeBox: {
    display: 'flex',
    flexFlow: 'column',
    '& .MuiGrid-root.MuiGrid-container': {
      flexFlow: 'inherit',
    },
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  projectCard: {
    display: 'flex',
    padding: theme.spacing(2),
    boxShadow: 'none',
    '& .MuiCardMedia-root': {
      width: theme.spacing(16),
      height: theme.spacing(16),
      border: `1px solid ${theme.palette.divider}`,
    },
    '& > .MuiCardContent-root': {
      display: 'flex',
      flexFlow: 'column',
    },
  },
  headerBox: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    ...tagLabel(theme),
  },
  textField: {
    width: '100%',
  },
}));

const useBotFormStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  card: {
    padding: theme.spacing(0),
    width: '100%',
    '& > .MuiCardContent-root': {
      width: '100%',
      display: 'inline-flex',
      padding: theme.spacing(0),
    },
  },
  stepper: stepper(theme),
  grid: {
    '& > *': {
      padding: theme.spacing(3),
    },
  },
  btns: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const useBotStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3, 0),
  },
  grid: {
    padding: theme.spacing(2),
  },
  card: {
    boxShadow: theme.shadows[3],
    padding: 0,
    '& .MuiTypography-root': {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1.6,
    },
    '& > .MuiBox-root': {
      padding: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      flexFlow: 'wrap',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    '& .MuiCardMedia-root': {
      width: theme.spacing(16),
      height: theme.spacing(16),
      border: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiCardContent-root': {
      ...tagLabel(theme),
      '& .MuiBox-root': {
        margin: theme.spacing(1, 0),
        '& > *:not(:last-child)::after': {
          content: '"|"',
          width: theme.spacing(1),
          margin: theme.spacing(0, 1),
        },
        '& .MuiTypography-root': {
          lineHeight: 1.5,
          color: theme.palette.text.secondary,
          fontSize: theme.typography.pxToRem(15),
        },
      },
    },
    '& .MuiCardActions-root': {
      padding: theme.spacing(2, 3),
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      '& button.reject': {
        background: theme.palette.error.main,
        '&:hover': {
          background: theme.palette.error.dark,
        },
      },
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        maxWidth: theme.breakpoints.values.lg,
      },
    },
    '& .MuiDialogTitle-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.palette.primary.main,
    },
    '& .MuiTable-root': {
      ...tagLabel(theme),
      '& th': {
        fontWeight: 'bold',
      },
    },
  },
}));

const useBotViewStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  pagination: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(1.5),
  },
}));

const useProjectFormStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  paper: {
    width: '100%',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    '& .MuiGrid-container .MuiGrid-item': {
      alignSelf: 'center',
    },
    '& .MuiGrid-container .MuiGrid-item .MuiAlert-root': {
      marginBottom: theme.spacing(2),
    },
  },
  withBtn: {
    display: 'flex',
    alignItems: 'baseline',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
    '& button': {
      minWidth: '89px',
      height: '36px',
      marginTop: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
      },
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(1),
      },
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  delete: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      background: theme.palette.error.dark,
    },
  },
  deleteDialog: {
    color: theme.palette.error.main,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const useProjectToolbarStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  textField: {
    [theme.breakpoints.up('md')]: {
      width: '33.3%',
    },
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const useEnhancedTableHeadStyle = makeStyles(() => ({
  tableHeadLabel: {
    fontWeight: 'bold',
    wordBreak: 'keep-all',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useProjectTableStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  tableRow: {
    wordBreak: 'keep-all',
  },
  cellLabel: { ...tagLabel(theme) },
}));

const useProjectStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const useSignUpStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  box: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  card: {
    padding: theme.spacing(0),
    '& .MuiCardContent-root': {
      display: 'inline-flex',
      padding: theme.spacing(0),
      width: '100%',
    },
  },
  header: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: 'bold',
  },
  stepper: stepper(theme),
  content: {
    '& > *': {
      padding: theme.spacing(3),
    },
    '& .MuiGrid-container': {
      marginTop: theme.spacing(2),
    },
  },
  btns: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const useSignInStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 3),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5, 1.5),
    },
    margin: 'auto',
  },
  card: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 4),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 2),
    },
  },
  header: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: 'bold',
  },
  signup: {
    margin: theme.spacing(2, 0),
    fontWeight: 'bold',
  },
  divider: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    '& hr': {
      flexGrow: 1,
    },
    '& .MuiTypography-root.MuiTypography-subtitle2': {
      margin: theme.spacing(1),
      color: theme.palette.divider,
    },
  },
}));

const useUserInfoStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 3),
    // margin: 'auto',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subject: {
    display: 'flex',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(1.5),
    },
    marginBottom: theme.spacing(1.5),
  },
  tabs: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
    '& .MuiTab-textColorInherit.Mui-selected': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
  },
  box: {
    marginTop: theme.spacing(3),
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: theme.spacing(1.5),
  },
  avatarCard: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiCardContent-root': {
      display: 'inherit',
      flexFlow: 'inherit',
      alignItems: 'inherit',
    },
    '& .MuiCardActions-root': {
      flexFlow: 'inherit',
    },
    '& .MuiCardActions-spacing > :not(:first-child)': {
      margin: 0,
    },
  },
  textField: {
    width: '100%',
  },
  infoCard: {
    '& .MuiCardActions-root': {
      padding: theme.spacing(2),
      justifyContent: 'flex-end',
    },
  },
  photoAlert: {
    marginTop: theme.spacing(3),
  },
}));

const useMenuStyle = makeStyles((theme) => ({
  appBar: {
    width: '100%',
    display: 'inline-flex;',
    flexFlow: 'row',
    justifyContent: 'space-between',
    zIndex: 1300,
    background: theme.palette.background.paper,
    color: theme.palette.secondary.main,
  },
  logoimg: {
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecorationLine: 'none',
  },
  logotext: {
    marginLeft: theme.spacing(2),
    fontFamily: 'Comfortaa',
    fontWeight: '900',
    lineHeight: '1.1',
    letterSpacing: '2px',
    width: '100px',
    fontSize: '.875rem',
  },
}));

const useTopMenuStyle = makeStyles((theme) => ({
  settings: {
    paddingRight: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  avatarBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.primary,
    '& > *': {
      marginRight: theme.spacing(1),
    },
    '& .nickname.MuiTypography-body1': {
      fontWeight: 'bold',
    },
  },
  fallback: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
  },
  ppopover: {
    '& .MuiPaper-root.MuiPopover-paper.MuiPaper-rounded': {
      display: 'flex',
      flexFlow: 'column',
      '& .MuiFormLabel-root': {
        cursor: 'pointer',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
}));
const TopMenuTabs = withStyles((theme) => ({
  root: {
    '&:selected': {
      textDecoration: 'underline',
      color: '#f00',
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const TopMenuTab = withStyles((theme) => ({
  root: {
    minWidth: 72,
    fontSize: theme.typography.pxToRem(16),
    letterSpacing: '1px',
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&.Mui-selected': {
      textDecoration: 'underline',
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
    '&:focus': {
      color: theme.palette.secondary.main,
    },
    '&:disabled': {
      display: 'none',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useHomeStyle = makeStyles((theme) => ({
  bg: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    background: `url(${BgLogo})`,
    backgroundPositionX: '90%',
    backgroundPositionY: '16%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&::before': {
      content: "''",
      position: 'absolute',
      display: 'block',
      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg width='2783' height='2774' viewBox='0 0 2783 2774' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M2100.5 339C1559.5 -35.5015 901 114.001 545.566 452.557L463.834 364.695C942 -75.9993 1678.5 -118 2174.5 245L2164 254L2152.5 264.5L2142.5 275.5L2133 287L2123.5 299L2115 312L2107.5 325.5L2100.5 339ZM463.332 534.838C43.9569 964.792 9.50006 1610.5 359.5 2084.5L347 2090.5L332.5 2098L320 2106L307.5 2114.5L295.5 2123.5L284 2133.5L273.5 2144L263.5 2154.5C-126 1626 -79.0001 924.001 377.429 451.049L463.332 534.838ZM2304.58 2259.21C2729 1841 2772 1177 2451.5 688.501L2464.5 682L2477 674.5L2489.5 666.5L2501 657.501L2512.5 648L2524 637.5L2535 626L2545 614C2901 1134 2862.34 1883.57 2388.29 2345.19L2304.58 2259.21ZM702 2435C1129.5 2759 1821 2728 2256.24 2324.55L2336.73 2413.54C1858.41 2846.19 1114 2893 629 2530.5L640.5 2520.5L651.5 2510L661.5 2499L671 2487L682.5 2471L693 2454L702 2435Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5'/%3e%3cpath d='M462.542 2470.63C541.932 2470.63 606.29 2406.28 606.29 2326.89C606.29 2247.5 541.932 2183.14 462.542 2183.14C383.153 2183.14 318.795 2247.5 318.795 2326.89C318.795 2406.28 383.153 2470.63 462.542 2470.63ZM725.79 2326.89C725.79 2472.27 607.93 2590.13 462.542 2590.13C317.155 2590.13 199.295 2472.27 199.295 2326.89C199.295 2181.5 317.155 2063.64 462.542 2063.64C607.93 2063.64 725.79 2181.5 725.79 2326.89Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5'/%3e%3cpath d='M2338.64 594.533C2418.03 594.533 2482.39 530.175 2482.39 450.785C2482.39 371.396 2418.03 307.038 2338.64 307.038C2259.25 307.038 2194.9 371.396 2194.9 450.785C2194.9 530.175 2259.25 594.533 2338.64 594.533ZM2601.89 450.785C2601.89 596.173 2484.03 714.033 2338.64 714.033C2193.26 714.033 2075.4 596.173 2075.4 450.785C2075.4 305.398 2193.26 187.538 2338.64 187.538C2484.03 187.538 2601.89 305.398 2601.89 450.785Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5'/%3e%3cpath d='M1944.58 888.379C2020.72 888.379 2084.91 903.873 2137.14 934.86C2189.38 965.847 2233.65 1010.11 2269.94 1067.66C2280.57 1084.48 2285.88 1100.42 2285.88 1115.47C2285.88 1134.95 2277.03 1150.89 2259.32 1163.28C2249.58 1169.48 2238.07 1172.58 2224.79 1172.58C2211.51 1172.58 2199.12 1169.48 2187.61 1163.28C2176.1 1156.2 2167.24 1146.9 2161.05 1135.39C2137.14 1095.55 2107.04 1065.45 2070.74 1045.09C2035.33 1023.84 1990.17 1013.21 1935.28 1013.21C1867.99 1013.21 1813.55 1026.49 1771.93 1053.05C1730.32 1078.73 1709.52 1116.36 1709.52 1165.94C1709.52 1211.98 1728.11 1250.49 1765.29 1281.48C1802.48 1312.46 1868.88 1332.83 1964.5 1342.56C2070.74 1353.19 2153.08 1385.5 2211.51 1439.51C2269.94 1492.63 2299.16 1563.02 2299.16 1650.67C2299.16 1714.41 2281.9 1769.3 2247.37 1815.34C2212.84 1860.5 2166.8 1894.58 2109.25 1917.6C2052.59 1939.74 1991.5 1950.8 1925.99 1950.8C1840.11 1950.8 1761.75 1931.32 1690.92 1892.37C1620.98 1853.41 1572.73 1802.51 1546.17 1739.65C1541.74 1729.02 1539.53 1720.17 1539.53 1713.08C1539.53 1699.8 1544.4 1688.29 1554.14 1678.56C1563.88 1667.93 1577.16 1660.85 1593.98 1657.31C1596.63 1656.42 1601.06 1655.98 1607.26 1655.98C1621.42 1655.98 1634.7 1660.41 1647.1 1669.26C1660.38 1677.23 1670.12 1688.29 1676.32 1702.46C1692.25 1736.99 1723.68 1766.21 1770.61 1790.11C1817.53 1814.01 1869.32 1825.97 1925.99 1825.97C1992.39 1825.97 2048.61 1810.92 2094.64 1780.81C2140.68 1749.83 2163.7 1707.77 2163.7 1654.65C2163.7 1604.19 2144.22 1561.25 2105.27 1525.83C2066.31 1489.53 2006.99 1467.4 1927.31 1459.43C1817.53 1448.81 1731.21 1416.93 1668.35 1363.81C1605.49 1309.81 1574.06 1242.52 1574.06 1161.95C1574.06 1105.29 1589.99 1056.6 1621.87 1015.87C1654.62 974.258 1698.89 942.828 1754.67 921.58C1811.33 899.446 1874.63 888.379 1944.58 888.379Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5' stroke-linecap='square'/%3e%3cpath d='M542.643 969.389C542.643 949.026 549.283 932.647 562.563 920.252C575.844 906.971 592.223 900.331 611.701 900.331C632.064 900.331 648.443 906.971 660.838 920.252C674.118 932.647 680.758 949.026 680.758 969.389V1589.58C680.758 1636.5 693.153 1678.56 717.943 1715.74C743.618 1752.93 778.589 1782.14 822.857 1803.39C868.01 1823.75 919.361 1833.94 976.908 1833.94C1031.8 1833.94 1080.94 1823.75 1124.32 1803.39C1167.7 1782.14 1201.35 1752.93 1225.25 1715.74C1250.04 1678.56 1262.43 1636.5 1262.43 1589.58V969.389C1262.43 949.026 1269.07 932.647 1282.35 920.252C1295.64 906.971 1312.01 900.331 1331.49 900.331C1350.97 900.331 1366.91 906.971 1379.3 920.252C1392.58 932.647 1399.22 949.026 1399.22 969.389V1589.58C1399.22 1660.41 1381.07 1724.15 1344.77 1780.81C1309.36 1836.59 1259.34 1880.42 1194.71 1912.29C1130.96 1943.28 1058.36 1958.77 976.908 1958.77C892.8 1958.77 817.545 1943.28 751.144 1912.29C685.627 1880.42 634.277 1836.59 597.092 1780.81C560.793 1725.04 542.643 1661.29 542.643 1589.58V969.389Z' stroke='${theme.palette.text.secondary}' stroke-width='0.5' stroke-linecap='square'/%3e%3c/svg%3e ")`,
      backgroundPositionX: '85%',
      backgroundPositionY: '34%',
      backgroundSize: '400% 400%',
      opacity: 0.5,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    '&::after': {
      content: "''",
      position: 'absolute',
      display: 'block',
      background: `linear-gradient(-45deg, ${`${theme.palette.background.default}f2 0%, ${theme.palette.background.default}4d 40%, ${theme.palette.background.default}1a 50%, ${theme.palette.background.default}4d 60%, ${theme.palette.background.default}f2 100%`})`,
      animation: 'gradient 7s ease infinite',
      backgroundSize: '400% 400%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  pibo: {
    '&>span': {
      color: '#03BFD7',
    },
    color: '#d1d3d4',
    fontFamily: 'Comfortaa',
    marginBottom: theme.spacing(2),
    width: '100%',
    textAlign: 'center',
  },
  bdc: {
    fontFamily: 'Comfortaa',
    textAlign: 'center',
  },
  container: {
    zIndex: '1500',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
    '& > *': {
      marginBottom: theme.spacing(4),
      filter: `drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.12)) drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.12))`,
      wordBreak: 'keep-all',
    },
  },
  chip: {
    '&.MuiButtonBase-root.MuiChip-root': {
      padding: theme.spacing(1, 3),
      fontSize: '1.1em',
      lineHeight: '1.7em',
    },
  },
}));

const useTermsStyle = makeStyles((theme) => ({
  formControl: {
    padding: theme.spacing(2, 0),
    '& .MuiAlert-root': {
      margin: theme.spacing(1, 0, 2),
    },
  },
  formgroup: {
    display: 'flex',
    flexFlow: 'wrap',
  },
  required: {
    '& .MuiTypography-body1': {
      '&::after': {
        content: '"*"',
      },
    },
  },
  markdown: {
    margin: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    lineHeight: '1.25em',
    height: theme.spacing(15),
    fontSize: '10px',
    overflowY: 'scroll',
    '& h3': {
      fontSize: '14px',
    },
    '& h4': {
      fontSize: '12px',
    },
    '&>.MuiBox-root': {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    width: '100%',
  },
}));

const useFormsStyle = makeStyles((theme) => ({
  required: {
    '& .MuiTypography-body1': {
      '&::after': {
        content: '"*"',
      },
    },
  },
  itemContainer: {
    '&.MuiGrid-container': {
      marginTop: 0,
    },
  },
  textField: {
    width: '100%',
  },
  withBtn: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
    '& button': {
      minWidth: '89px',
      height: '36px',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
      },
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(1),
      },
    },
  },
  sendBtn: {
    width: '100%',
    '&&': {
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(2, 0),
      },
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(1, 0),
      },
    },
  },
  mailProgress: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
}));

const useDrawerMenuStyle = makeStyles((theme) => ({
  iconBtn: {
    height: '100%',
    margin: 'auto',
  },
  root: {
    minWidth: '50vw',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(2, 0),
    },
    '& .MuiFormLabel-root': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  badge: {
    alignSelf: 'center',
    flexFlow: 'inherit',
    textAlign: 'center',
    '& .MuiAvatar-root.MuiAvatar-circle': {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    '& .nickname.MuiTypography-body1': {
      fontWeight: 'bold',
    },
  },
}));

export {
  tagLabel,
  useDashBoardStyle,
  useBotViewStyle,
  useBotSelectStyle,
  useBotFormStyle,
  useBotStyle,
  useEnhancedTableHeadStyle,
  useProjectTableStyle,
  useProjectFormStyle,
  useProjectToolbarStyles,
  useProjectStyle,
  useSignUpStyle,
  useSignInStyle,
  useUserInfoStyle,
  useMenuStyle,
  useTopMenuStyle,
  useDrawerMenuStyle,
  useHomeStyle,
  useTermsStyle,
  useFormsStyle,
  TopMenuTabs,
  TopMenuTab,
};
