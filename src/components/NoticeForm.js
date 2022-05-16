import React from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MDEditor from '@uiw/react-md-editor';
import EnvSelect from './EnvSelect';

const useStyles = makeStyles(() => ({
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
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

const NoticeForm = ({
  fixed,
  order,
  title,
  content,
  error,
  label,
  handleInit,
  handleClick,
  setContent,
  handleCheckChange,
  handleTitleChange,
  handleClickClear,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container item xs={12} gap={1}>
        <Grid item xs={3}>
          <EnvSelect />
        </Grid>
        <Grid item xs={9} style={{ paddingLeft: '1rem' }}>
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
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          id="title"
          name="title"
          className={classes.title}
          label="제목을 입력하세요."
          onChange={handleTitleChange}
          value={title}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="clear title" onClick={handleClickClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MDEditor
          value={content}
          onChange={setContent}
          height={window.screen.availHeight * 0.5}
          className={classes.editor}
        />
      </Grid>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Grid item className={classes.buttonGroup} xs={12}>
        <Button variant="contained" color="primary" onClick={handleInit}>
          초기화
        </Button>
        <Button variant="contained" color="primary" onClick={handleClick}>
          {label}
        </Button>
      </Grid>
    </>
  );
};

export default NoticeForm;
