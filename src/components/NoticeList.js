import { darken, Grid } from '@mui/material';
import { styled } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import EnvSelect from './EnvSelect';

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  overflowY: 'scroll',
  overflowX: 'auto',
  width: '100%',
  cursor: 'pointer',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
    borderRadius: '3px',
    margin: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: `${darken(theme.palette.divider, 0.16)}`,
    borderRadius: '3px',
  },
  '& .MuiDataGrid-virtualScroller': {
    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius: '3px',
      margin: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.divider,
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: `${darken(theme.palette.divider, 0.16)}`,
      borderRadius: '3px',
    },
  },
}));

const NoticeList = ({
  list,
  headers,
  limit,
  visible,
  error,
  handleListInit,
}) => (
  <>
    {visible && (
      <Grid container item xs={12} gap={1}>
        <Grid item xs={3}>
          <EnvSelect onChange={handleListInit} />
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 650, width: '100%' }}>
            <CustomDataGrid
              rows={list}
              columns={headers}
              pageSize={limit}
              // checkboxSelection
              disableSelectionOnClick
            />
            <div>{error && <div>{error}</div>}</div>
          </div>
        </Grid>
      </Grid>
    )}
  </>
);

export default NoticeList;
