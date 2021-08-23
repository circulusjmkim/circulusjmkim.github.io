import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-use';
import RedisFindContainer from '../containers/RedisFindContainer';
import RedisAddContainer from '../containers/RedisAddContainer';
import { MENUS } from '../core/utils/consts';
import { setMenu } from '../features/robot';

const Redis = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { item } = useSelector(state => state.page);

  useEffect(() => {
    let index = 0;
    if(item >= 0) {
      index = item;
    }
    const menu = MENUS[3].list[index].path;
    dispatch(setMenu(item));
    history.replace(`${pathname}?menu=${menu}`);
  }, [item]);

  return (<>
    {item === 0 && <RedisFindContainer /> }
    {item === 1 && <RedisAddContainer /> }
  </>);
};

export default Redis;