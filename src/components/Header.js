/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
    // margin: theme.spacing(1),
    '&>img': {
      '@media (min-width: 600px)': {
        margin: theme.spacing(2),
        height: '5rem',
        width: 'auto',
      },
      '@media (max-width: 600px)': {
        margin: theme.spacing(1),
        height: '3.2rem',
        width: 'auto',
      },
    },
    '& .MuiTypography-h3': {
      margin: theme.spacing(1),
      '@media (max-width: 600px)': {
        marginBottom: theme.spacing(1),
        fontSize: '20px',
      },
    },
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid item xs={12}>
      <div
        className={classes.logo}
        role="button"
        onClick={() => history.push('/')}
        aria-hidden="true"
      >
        <img alt="Circulus" src="/logo_circulus.png" />
        <Typography variant="h3">{title}</Typography>
      </div>
    </Grid>
  );
};

export default Header;
