import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(1)} 0`,
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: 0,
    },
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  formRoot: {
    flexFlow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: `0 ${theme.spacing(1)}`,
    },
  },
  marginVertical: {
    margin: 'auto 0',
  },
  textField: {
    minWidth: '300px',
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, -4.5px) scale(0.75)',
    },
  },
  smallTextField: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, -4.5px) scale(0.75)',
    },
  },
  cardGrid: {
    '& .MuiGrid-root.MuiGrid-item': {
      marginBottom: `${theme.spacing(1)}`,
      marginRight: `${theme.spacing(1)}`,
    },
  },
  cardTextField: {
    minWidth: '300px',
    maxWidth: '500px',
    width: '100%',
    margin: `${theme.spacing(2)} 0`,
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, -4.5px)',
      fontSize: theme.typography.pxToRem(12),
    },
  },
  cardRoot: {
    minWidth: 275,
    '& h6.MuiTypography-root.MuiTypography-subtitle1': {
      margin: theme.spacing(1),
      '& p': {
        margin: `${theme.spacing(1)} 0`,
      },
    },
  },
  cardValue: {
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  cellProp: {
    '&.MuiTableCell-root': {
      textAlign: 'right',
      // marginRight: theme.spacing(2),
      padding: theme.spacing(1),
      '&:first-child': {
        width: '95px',
      },
      '& .MuiTypography-root': {
        fontSize: '0.875em',
      },
    },
  },
  btnDisconnect: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: `${theme.palette.error.main.replace('1)', '.08)')};`,
    },
  },
  btn: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardError: {
    width: '100%',
    maxWidth: 'fit-content',
  },
  roleChip: {
    fontSize: theme.typography.pxToRem(10),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
