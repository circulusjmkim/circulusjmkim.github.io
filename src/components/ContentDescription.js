import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

const ContentDescription = ({ desc }) => {
  const [descArr, setDescription] = useState(desc.split('\n'));

  useEffect(() => {
    setDescription(desc.split('\n'));
  }, [desc]);

  return (
  <Fragment>
  {
    descArr.map(description => <Typography variant="subtitle2" gutterBottom>{description}</Typography>)
  }
  </Fragment>
  );
};

export default ContentDescription;