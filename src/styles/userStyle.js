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
  marginVertical: {
    margin: 'auto 0',
  },
  marginTextField: {
    margin: theme.spacing(1),
    width: '45ch',
  },
  margin: {
    margin: `${theme.spacing(1)}px 0`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  disabled: {
    color: theme.palette.grey[600]
  },
  signupButton: {
    margin: theme.spacing(1),
    width: '45ch',
  }
}));