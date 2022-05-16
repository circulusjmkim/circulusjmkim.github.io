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
  marginVertical: {
    margin: 'auto 0',
  },
  halfTextField: {
    margin: theme.spacing(1),
    width: '21.5ch',
  },
  marginTextField: {
    margin: theme.spacing(1),
    width: '45ch',
  },
  margin: {
    margin: `${theme.spacing(1)} 0`,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  disabled: {
    color: theme.palette.grey[600],
  },
  signupButton: {
    margin: theme.spacing(1),
    width: '45ch',
  },
  toggleWrap: {
    margin: theme.spacing(2),
  },
  switch: {
    margin: theme.spacing(1),
  },
}));
