import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, ButtonGroup, Dialog, DialogTitle } from '@mui/material';

const useStyles = makeStyles({
  root: {
    minWidth: '150px',
  },
});

const NoticeDeleteDialog = (props) => {
  const classes = useStyles();
  const { onDelete, onClose, value, open } = props;

  const handleDelete = (i, j) => () => {
    onDelete(i, j);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      open={open}
      className={classes.root}
    >
      <DialogTitle id="delete-dialog">
        해당 공지사항을 삭제하시겠습니까?
      </DialogTitle>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="text"
      >
        <Button onClick={handleDelete(value)}>삭제</Button>
        <Button onClick={handleDelete(value, true)}>완전 삭제</Button>
        <Button onClick={onClose}>취소</Button>
      </ButtonGroup>
    </Dialog>
  );
};

export default NoticeDeleteDialog;
