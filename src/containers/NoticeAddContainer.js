import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import { Button, Grid, IconButton, InputAdornment, TextField,FormControlLabel, Checkbox, Typography,  makeStyles } from '@material-ui/core';
import { useUpdateEffect } from 'react-use';
import { add, init } from '../features/notice';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(1)}px 0`,
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: 0,
    },
    '& > *': {
      marginBottom: theme.spacing(2),
    }
  },
  title: {
    width: '100%',
  },
  editor: {
    '&.w-md-editor': {
      width: '100%',
    },
    '& > .w-md-editor-toolbar': {
      minHeight: '29px',
      height: 'initial !important',
    }
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  }
}));

const initContent = "**공지사항을 입력하세요.**";
const initTitle = "";
const initChecked = { fixed: false, order: false };

const NoticeAddContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, saved } = useSelector(state => state.notice);
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
  }
  const handleTitleChange = (e) => { setTitle(e.target.value); };
  const handleClickClear = () => { setTitle(''); };
  const handleCheckChange = n => (e, c) => { setChecked({ fixed, order, [n]: c})};
  const handleInit = () => {
    setContent(initContent);
    setTitle(initTitle);
    setChecked(initChecked);
    dispatch(init());
  }
  useUpdateEffect(() => {
    if(saved) {
      setTimeout(handleInit, 1000);
    }
  }, [saved]);

  return (
    <Grid container
      // direction="row"
      direction="column"
      justifyContent="flex-start"
      className={classes.root}
    >
      {!saved && (<>
      <Grid item xs={12} lg={6}>
        <TextField
          id="title"
          name="title"
          className={classes.title} 
          label='제목을 입력하세요.'
          onChange={handleTitleChange} 
          value={title}
          InputProps={{
            endAdornment: (<InputAdornment position="end">
            <IconButton
              aria-label="clear title"
              onClick={handleClickClear}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>)
          }}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={fixed}
              onChange={handleCheckChange('fixed')}
              name="fixed"
              color="primary"
            />
          }
          label="상단고정"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={order}
              onChange={handleCheckChange('order')}
              name="order"
              color="primary"
            />
          }
          label="릴리즈노트"
        />
      </Grid>
      <Grid item xs={12}>
        <MDEditor
          value={content}
          onChange={setContent}
          height={window.screen.availHeight*.5}
          className={classes.editor}
        />
      </Grid>
      {
        error && <Typography variant="body2" color="error">{error}</Typography>
      }
      <Grid item className={classes.buttonGroup} xs={12}>
        <Button variant="contained" color="primary" onClick={handleInit}>초기화</Button>
        <Button variant="contained" color="primary" onClick={handleClick}>등록</Button>
      </Grid>
      </>)}
      {
        saved && (
          <>
            <Typography variant="body1" color="textPrimary">공지사항이 등록되었습니다.😉</Typography>
            <Typography variant="body2" color="textSecondary">메시지는 자동으로 사라집니다.</Typography>
          </>
        )
      }
    </Grid>
  );
}

export default NoticeAddContainer;

