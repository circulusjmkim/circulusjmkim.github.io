import React from 'react';
import { Grid, Typography } from '@mui/material';

const SubContent = ({ desc, classes }) => (
  <Grid item xs={12} sm={8} md={9} lg={10}>
    <div className={classes.content}>
      <Typography>{desc}</Typography>
    </div>
  </Grid>
);

export default SubContent;
