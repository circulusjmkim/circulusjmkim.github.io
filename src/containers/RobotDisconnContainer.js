import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexFlow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: `0 ${theme.spacing(1)}px`,
    }
  },
}));

const RobotDisconnContainer = () => {
  const classes = useStyles();
  return (
    <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      className={classes.root}
      spacing={2}
      > 
    </Grid>
  )
};

export default RobotDisconnContainer;
