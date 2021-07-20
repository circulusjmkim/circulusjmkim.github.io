import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import UserUpdatePasswordContainer from '../containers/UserUpdatePasswordContainer';
import UserUpdateVerifiedContainer from '../containers/UserUpdateVerifiedContainer';
import UserClearDataContainer from '../containers/UserClearDataContainer';
import UserUpdateBAKDataContainer from '../containers/UserUpdateBAKDataContainer';
import UserSignupContainer from '../containers/UserSignupContainer';

const User = () => {
  const { item } = useSelector(state => state.page);

  return (<>
    {item === 0 && <UserUpdatePasswordContainer /> }
    {item === 1 && <UserUpdateVerifiedContainer /> }
    {item === 2 && <UserClearDataContainer /> }
    {item === 3 && <UserUpdateBAKDataContainer /> }
    {item === 4 && <UserSignupContainer /> }
  </>);
};

export default User;