import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import RobotDisconnContainer from '../containers/RobotDisconnContainer';
import RobotTransferDataContainer from '../containers/RobotTransferDataContainer';
import RobotClearDataContainer from '../containers/RobotClearDataContainer';

const Robot = () => {
  const { item } = useSelector(state => state.page);

  return (<Fragment>
    {item === 0 && <RobotDisconnContainer /> }
    {item === 1 && <RobotTransferDataContainer /> }
    {item === 2 && <RobotClearDataContainer /> }
  </Fragment>);
};

export default Robot;