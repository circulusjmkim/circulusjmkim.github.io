/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMount, useUpdateEffect } from 'react-use';
import { Grid, Typography } from '@mui/material';
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
    // width: 100,
    // editable: true,
  },
  {
    field: 'fixed',
    headerName: '상단고정',
    align: 'center',
    headerAlign: 'center',
    // width: 100,
    // editable: true,
  },
  {
    field: 'createdAt',
    headerName: '작성일',
    width: 180,
    // type: 'number',
    // editable: true,
  },
  {
    field: 'updatedAt',
    headerName: '수정일',
    width: 180,
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //     params.getValue(params.id, 'lastName') || ''
    //   }`,
  },
  {
    field: 'editBtn',
    headerName: '수정',
    width: 110,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ id, value: handleEdit }) => (
      <EditIcon onClick={handleEdit(id)} />
    ),
  },
  {
    field: 'deleteBtn',
    headerName: '삭제',
    width: 110,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ id, value: handleDelete }) => (
      <DeleteForeverIcon onClick={handleDelete(id)} />
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
  const { error, list, skip, limit, editMode, editItem, saved } = useSelector(
    (state) => state.notice,
  );
  const {
    content: originContent,
    title: originTitle,
    fixed: originFixed,
    order: originOrder,
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
    dispatch(setEditMode({ mode: !editMode, item: editMode ? null : id }));
  };

  const handleDeleteDialog = (id) => () => {
    setOpen({ open: true, selectId: id });
  };

  const handleDelete =
    (value, strict = false) =>
    () => {
      dispatch(deleteItem({ id: value, strict }));
    };

  const handleDialogClose = () => {
    setOpen(false);
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
    setContent(originContent || '');
    setTitle(originTitle || '');
    setChecked({ fixed: originFixed || false, order: originOrder || false });
    dispatch(setEditMode({ mode: false }));
    dispatch(
      getList({ skip, limit, handleEdit, handleDelete: handleDeleteDialog }),
    );
  };

  useMount(() => {
    dispatch(
      getList({ skip, limit, handleEdit, handleDelete: handleDeleteDialog }),
    );
  });

  useUpdateEffect(() => {
    setContent(originContent);
    setTitle(originTitle);
    setChecked({ fixed: originFixed, order: originOrder });
  }, [editItem]);

  useUpdateEffect(() => {
    if (saved) {
      setTimeout(handleListInit, 1000);
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
      {editMode && (
        <NoticeForm
          {...{
            label: '수정',
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
