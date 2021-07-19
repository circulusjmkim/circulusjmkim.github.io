import React from 'react';
import { useSelector } from 'react-redux';
import FindUserContainer from '../containers/FindUserContainer';

const Find = () => {
  const { item } = useSelector(state => state.page);

  return (<>
    {item === 0 && <FindUserContainer /> }
  </>);
};


export default Find;
