import React from 'react';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';

const SubList = ({ index, selected, label, fold, classes, onChange }) => {
  const handleChange = newValue => () => {
    onChange(newValue);
  };
  return (
    <>
      {(!fold || (fold && selected)) &&
        <div
          className={classes.list}
          role="presentation"
        >
          <List>
            <ListItem button key={label} onClick={handleChange(index)} selected={selected}>
              <ListItemText primary={label} />
            </ListItem>
          </List>
          <Divider />
        </div>
      }
    </>
)};

export default SubList;