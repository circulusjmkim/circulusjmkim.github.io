import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import RobotConnContainer from '../containers/RobotConnContainer';
import RobotDisconnContainer from '../containers/RobotDisconnContainer';
import RobotTransferDataContainer from '../containers/RobotTransferDataContainer';
import RobotClearDataContainer from '../containers/RobotClearDataContainer';

const Robot = () => {
  const { item } = useSelector(state => state.page);

  return (<>
    {item === 0 && <RobotConnContainer /> }
    {item === 1 && <RobotDisconnContainer /> }
    {item === 2 && <RobotTransferDataContainer /> }
    {item === 3 && <RobotClearDataContainer /> }
  </>);
};

export default Robot;