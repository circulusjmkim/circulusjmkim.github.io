import { Grid, Typography, Divider } from '@mui/material';
import React from 'react';

const SubHeader = ({ classes, desc }) => (
  <Grid item xs={12}>
    {desc && (
      <Typography variant="h6" className={classes.subheader}>
        {desc}
      </Typography>
    )}
    <Divider />
  </Grid>
);

export default SubHeader;
