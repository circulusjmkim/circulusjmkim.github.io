import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useUpdateEffect } from 'react-use';
import { add, init } from '../features/notice';
import NoticeForm from '../components/NoticeForm';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(1)} 0`,
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: 0,
    },
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const initContent = '**공지사항을 입력하세요.**';
const initTitle = '';
const initChecked = { fixed: false, order: false };

const NoticeAddContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, saved } = useSelector((state) => state.notice);
  const [content, setContent] = useState(initContent);
  const [title, setTitle] = useState(initTitle);
  const [{ fixed, order }, setChecked] = useState(initChecked);

  const handleClick = () => {
    const notice = {
      title,
      content,
      fixed,
      order: order ? 1 : 0,
    };
    dispatch(add(notice));
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleClickClear = () => {
    setTitle('');
  };
  const handleCheckChange = (n) => (e, c) => {
    setChecked({ fixed, order, [n]: c });
  };
  const handleInit = () => {
    setContent(initContent);
    setTitle(initTitle);
    setChecked(initChecked);
    dispatch(init());
  };
  useUpdateEffect(() => {
    if (saved) {
      setTimeout(handleInit, 1000);
    }
  }, [saved]);

  return (
    <Grid
      container
      // direction="row"
      direction="column"
      justifyContent="flex-start"
      gap={1}
      className={classes.root}
    >
      {!saved && (
        <NoticeForm
          {...{
            label: '등록',
            editMode: false,
            fixed,
            order,
            title,
            content,
            error,
            handleInit,
            handleClick,
            setContent,
            handleCheckChange,
            handleTitleChange,
            handleClickClear,
          }}
        />
      )}
      {saved && (
        <>
          <Typography variant="body1" color="textPrimary">
            공지사항이 등록되었습니다.😉
          </Typography>
          <Typography variant="body2" color="textSecondary">
            메시지는 자동으로 사라집니다.
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default NoticeAddContainer;
