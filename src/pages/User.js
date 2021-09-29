import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-use';
import UserUpdatePasswordContainer from '../containers/UserUpdatePasswordContainer';
import UserUpdateVerifiedContainer from '../containers/UserUpdateVerifiedContainer';
import UserClearDataContainer from '../containers/UserClearDataContainer';
import UserUpdateBAKDataContainer from '../containers/UserUpdateBAKDataContainer';
import UserSignupContainer from '../containers/UserSignupContainer';
import { MENUS } from '../core/utils/consts';
import { setMenu } from '../features/user';

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { item } = useSelector(state => state.page);

  useEffect(() => {
    let index = 0;
    if(item >= 0) {
      index = item;
    }
    const menu = MENUS[2].list[index].path;
    dispatch(setMenu(item));
    history.replace(`${pathname}?menu=${menu}`);
  }, [item]);

  return (<>
    {item === 0 && <UserSignupContainer /> }
    {item === 1 && <UserUpdatePasswordContainer /> }
    {item === 2 && <UserUpdateVerifiedContainer /> }
    {item === 3 && <UserUpdateBAKDataContainer /> }
    {item === 4 && <UserClearDataContainer /> }
  </>);
};

export default User;