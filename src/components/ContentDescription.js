/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

const ContentDescription = ({ desc, value }) => {
  const [descArr, setDescription] = useState([]);

  useEffect(() => {
    setDescription(desc.split('\n'));
  }, [desc]);

  return (
  <>
  {
    descArr.map((description, i) => <Typography key={`${value}_${i}`} variant="subtitle2" gutterBottom>{description}</Typography>)
  }
  </>
  );
};

export default ContentDescription;