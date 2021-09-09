import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(1)}px 0`,
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: 0,
    },
    '& > *': {
      marginBottom: theme.spacing(2),
    }
  },
  formRoot: {
    flexFlow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: `0 ${theme.spacing(1)}px`,
    }
  },
  toggleWrap: {
    margin: `${theme.spacing(2)}px ${theme.spacing(0)}px`,
  },
  textField: {
    minWidth: '300px',
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, -4.5px) scale(0.75)'
    }
  },
  marginVertical: {
    margin: 'auto 0',
  },
}));