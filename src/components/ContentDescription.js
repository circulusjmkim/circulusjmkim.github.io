import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

const ContentDescription = ({ desc, value }) => {
  const [descArr, setDescription] = useState(desc.split('\n'));

  useEffect(() => {
    setDescription(desc.split('\n'));
  }, [desc]);

  return (
  <>
  {
    descArr.map(description => <Typography key={value} variant="subtitle2" gutterBottom>{description}</Typography>)
  }
  </>
  );
};

export default ContentDescription;