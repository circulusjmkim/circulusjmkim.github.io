import { Grid, Typography, Divider} from '@material-ui/core';
import React from 'react';

const SubHeader = ({classes, desc}) => (
  <Grid item xs={12}>
    <Typography variant="h6" className={classes.subheader}>{desc}</Typography>
    <Divider />
  </Grid>
);

export default SubHeader;