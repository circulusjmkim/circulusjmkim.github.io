import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    width: '100%',
    maxWidth: '200px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EnvSelect = ({ label, onChange }) => {
  const classes = useStyles();

  const handleChange = (e, { props: { value } }) => {
    localStorage.setItem('env', value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <FormControl className={classes.formControl}>
      {label && <InputLabel id="env-select-label">{label}</InputLabel>}
      <Select
        labelId="env-select-label"
        id="env-select"
        value={localStorage.getItem('env') || 'ops'}
        onChange={handleChange}
      >
        <MenuItem value="ops">OPS</MenuItem>
        <MenuItem value="stg">STG</MenuItem>
        {/* <MenuItem value="dev">DEV</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default EnvSelect;
