import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import NoticeAddContainer from '../containers/NoticeAddContainer';
import NoticeUpdateContainer from '../containers/NoticeUpdateContainer';

const Notice = () => {
  const { item } = useSelector(state => state.page);

  return (<>
    {item === 0 && <NoticeAddContainer /> }
    {item === 1 && <NoticeUpdateContainer /> }
  </>);
};

export default Notice;