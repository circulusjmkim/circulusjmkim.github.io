/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/styles';
import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const FullWidthTabs = ({ list, onChange, value, classes }) => {
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleChangeIndex = (index) => {
    onChange(index);
  };

  return (
    <Grid item xs={12} className={classes.menutab}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs"
          >
            {list.map(({ label, value: v }, i) => (
              <Tab {...{ ...a11yProps(i), label, key: v }} />
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {list.map(({ value: v, label }, index) => (
            <TabPanel {...{ value: v, index, dir: theme.direction, key: v }}>
              {label}
            </TabPanel>
          ))}
        </SwipeableViews>
      </div>
    </Grid>
  );
};

export default FullWidthTabs;
