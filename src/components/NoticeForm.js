import React from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Stack,
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
  itemId,
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
  handleClickPrev,
  handleClickClear,
  handleDeleteDialog,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container item xs={12} spacing={1}>
        <Grid item xs={12}>
          <Button
            color="primary"
            startIcon={<ArrowBackIosNewIcon />}
            onClick={handleClickPrev}
            size="small"
          >
            목록보기
          </Button>
        </Grid>
        <Grid item xs={2}>
          <EnvSelect />
        </Grid>
        <Grid item xs={10} sx={{ pl: 1, mb: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={fixed || false}
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
                checked={order || false}
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
      {itemId && (
        <Grid item className={classes.buttonGroup} xs={12}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteDialog && handleDeleteDialog(itemId)}
            size="small"
          >
            삭제
          </Button>
          <Stack direction="row" gap={1}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleInit}
              size="small"
            >
              초기화
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              size="small"
            >
              {label}
            </Button>
          </Stack>
        </Grid>
      )}
      {!itemId && (
        <Grid item className={classes.buttonGroup} xs={12}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleInit}
            size="small"
          >
            초기화
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            size="small"
          >
            {label}
          </Button>
        </Grid>
      )}
    </>
  );
};

export default NoticeForm;
