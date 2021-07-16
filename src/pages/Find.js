import React, { Fragment } from 'react';
import FindUserContainer from '../containers/FindUserContainer';
import { useSelector } from 'react-redux';

const Find = () => {
  const { item } = useSelector(state => state.page);

  return (<Fragment>
    {item === 0 && <FindUserContainer /> }
  </Fragment>);
};


export default Find;
