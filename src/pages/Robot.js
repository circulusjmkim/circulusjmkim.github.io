import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RobotConnContainer from '../containers/RobotConnContainer';
import RobotDisconnContainer from '../containers/RobotDisconnContainer';
import RobotTransferDataContainer from '../containers/RobotTransferDataContainer';
import RobotClearDataContainer from '../containers/RobotClearDataContainer';
import { setMenu } from '../features/robot';

const Robot = () => {
  const dispatch = useDispatch();
  const { item } = useSelector(state => state.page);

  useEffect(() => {
    dispatch(setMenu(item));
  }, [item]);

  return (<>
    {item === 0 && <RobotConnContainer /> }
    {item === 1 && <RobotDisconnContainer /> }
    {item === 2 && <RobotTransferDataContainer /> }
    {item === 3 && <RobotClearDataContainer /> }
  </>);
};

export default Robot;