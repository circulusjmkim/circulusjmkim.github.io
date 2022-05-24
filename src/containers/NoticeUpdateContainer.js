/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLifecycles, useUpdateEffect } from 'react-use';
import {
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import {
  deleteItem,
  getList,
  setEditMode,
  updateItem,
} from '../features/notice';
import NoticeList from '../components/NoticeList';
import NoticeForm from '../components/NoticeForm';
import NoticeDeleteDialog from '../components/NoticeDeleteDialog';

const NoticeGridStyle = makeStyles((theme) => ({
  textButton: {
    color: theme.palette.secondary.main,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const headers = [
  {
    field: 'title',
    headerName: '제목',
    width: 250,
    renderCell: ({ id, value: { title, handleEdit } }) => (
      <button
        className={NoticeGridStyle().textButton}
        type="button"
        onClick={handleEdit(id)}
      >
        {title}
      </button>
    ),
  },
  {
    field: 'note',
    headerName: '릴리즈 노트',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'fixed',
    headerName: '상단고정',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'createdAt',
    headerName: '작성일',
    headerAlign: 'center',
    width: 180,
  },
  {
    field: 'updatedAt',
    headerName: '수정일',
    headerAlign: 'center',
    width: 180,
  },
  {
    field: 'btns',
    headerName: '수정 및 삭제',
    align: 'center',
    headerAlign: 'center',
    renderCell: ({ id, value: { handleEdit, handleDelete } }) => (
      <Stack direction="row" gap={0.5}>
        <IconButton aria-label="수정" onClick={handleEdit(id)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="삭제" onClick={handleDelete(id)}>
          <DeleteForeverIcon />
        </IconButton>
      </Stack>
    ),
  },
];

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
  marginVertical: {
    margin: 'auto 0',
  },
}));

const NoticeUpdateContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    error,
    pending,
    list,
    skip,
    limit,
    editMode,
    editItem,
    saved,
    deleted,
  } = useSelector((state) => state.notice);
  const {
    content: originContent,
    title: originTitle,
    fixed: originFixed,
    order: originOrder,
    _id: itemId,
  } = editItem || { content: '', title: '', fixed: false, order: false };
  const [content, setContent] = useState(originContent || '');
  const [title, setTitle] = useState(originTitle || '');
  const [{ fixed, order }, setChecked] = useState(
    editItem
      ? { fixed: originFixed, order: originOrder }
      : { fixed: false, order: false },
  );
  const [{ open, selectId }, setOpen] = useState({
    open: false,
    selectId: null,
  });

  const handleEdit = (id) => () => {
    dispatch(setEditMode({ mode: true, item: id }));
  };

  const handleDeleteDialog = (id) => () => {
    setOpen({ open: true, selectId: id });
  };

  const handleDelete = (value, strict = false) => {
    dispatch(deleteItem({ id: value, strict }));
  };

  const handleDialogClose = () => {
    setOpen({ open: false, selectId: null });
  };

  const handleClick = () => {
    const notice = {
      id: editItem._id,
      title,
      content,
      fixed,
      order: order ? 1 : 0,
      date: new Date(),
    };
    dispatch(updateItem(notice));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleClickPrev = () => {
    setContent(originContent || '');
    setTitle(originTitle || '');
    setChecked({ fixed: originFixed || false, order: originOrder || false });
    dispatch(setEditMode({ mode: false }));
  };
  const handleClickClear = () => {
    setTitle('');
  };
  const handleCheckChange = (n) => (e, c) => {
    setChecked({ fixed, order, [n]: c });
  };
  const handleInit = () => {
    setContent(originContent || '');
    setTitle(originTitle || '');
    setChecked({ fixed: originFixed || false, order: originOrder || false });
    dispatch(setEditMode({ mode: true, item: editItem._id }));
  };
  const handleListInit = () => {
    handleClickPrev();
    dispatch(
      getList({ skip, limit, handleEdit, handleDelete: handleDeleteDialog }),
    );
  };

  useLifecycles(
    () => {
      dispatch(
        getList({ skip, limit, handleEdit, handleDelete: handleDeleteDialog }),
      );
    },
    () => dispatch(setEditMode({ mode: false })),
  );

  useUpdateEffect(() => {
    setContent(originContent);
    setTitle(originTitle);
    setChecked({ fixed: originFixed, order: originOrder });
  }, [editItem]);

  useUpdateEffect(() => {
    if (deleted !== null) {
      setOpen({ open: false, selectId: null });
    }
    if (saved || deleted) {
      setTimeout(handleListInit, 1000);
    }
  }, [saved, deleted]);

  return (
    <Grid
      container
      // direction="row"
      direction="column"
      justifyContent="flex-start"
      gap={1}
      className={classes.root}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!editMode && (
        <NoticeList
          {...{
            list,
            headers,
            limit,
            error,
            visible: list.length > 0,
            handleListInit,
          }}
        />
      )}
      {editMode && !saved && (
        <NoticeForm
          {...{
            label: '수정',
            editMode,
            itemId,
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
            handleDeleteDialog,
            handleClickPrev,
          }}
        />
      )}
      {editMode && saved && (
        <>
          <Typography variant="body1" color="textPrimary">
            공지사항이 수정되었습니다.😉
          </Typography>
          <Typography variant="body2" color="textSecondary">
            메시지는 자동으로 사라집니다.
          </Typography>
        </>
      )}
      <NoticeDeleteDialog
        value={selectId}
        open={open}
        onClose={handleDialogClose}
        onDelete={handleDelete}
      />
    </Grid>
  );
};

export default NoticeUpdateContainer;
