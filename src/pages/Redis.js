import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import RedisFindContainer from '../containers/RedisFindContainer';
import RedisAddContainer from '../containers/RedisAddContainer';

const Redis = () => {
  const { item } = useSelector(state => state.page);

  return (<Fragment>
    {item === 0 && <RedisFindContainer /> }
    {item === 1 && <RedisAddContainer /> }
  </Fragment>);
};

export default Redis;