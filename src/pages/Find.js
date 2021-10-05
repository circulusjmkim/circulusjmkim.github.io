import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-use';
import FindUserContainer from '../containers/FindUserContainer';
import { MENUS } from '../core/utils/consts';

const Find = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { item } = useSelector(state => state.page);
  useEffect(() => {
    let index = 0;
    if(item >= 0) {
      index = item;
    }
    const menu = MENUS[0].list[index].path;
    history.replace(`${pathname}?menu=${menu}`);
  }, [item]);

  return (<>
    {item === 0 && <FindUserContainer /> }
  </>);
};


export default Find;
