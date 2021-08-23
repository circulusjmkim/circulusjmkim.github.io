import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import RobotConnContainer from '../containers/RobotConnContainer';
import RobotDisconnContainer from '../containers/RobotDisconnContainer';
import RobotTransferDataContainer from '../containers/RobotTransferDataContainer';
import RobotClearDataContainer from '../containers/RobotClearDataContainer';
import { setMenu } from '../features/robot';
import { MENUS } from '../core/utils/consts';

const Robot = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { item } = useSelector(state => state.page);

  useEffect(() => {
    let index = 0;
    if(item >= 0) {
      index = item;
    }
    const menu = MENUS[1].list[index].path;
    dispatch(setMenu(item));
    history.replace(`${pathname}?menu=${menu}`);
  }, [item]);

  return (<>
    {item === 0 && <RobotConnContainer /> }
    {item === 1 && <RobotDisconnContainer /> }
    {item === 2 && <RobotTransferDataContainer /> }
    {item === 3 && <RobotClearDataContainer /> }
  </>);
};

export default Robot;