import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import FindUserContainer from '../containers/FindUserContainer';

const Find = () => {
  const { item } = useSelector(state => state.page);

  return (<Fragment>
    {item === 0 && <FindUserContainer /> }
  </Fragment>);
};


export default Find;
