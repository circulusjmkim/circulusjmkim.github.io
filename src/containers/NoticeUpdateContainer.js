import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMount } from 'react-use';
import { DataGrid } from '@material-ui/data-grid';
import { getList } from '../features/notice';

const headers = [
  { field: 'title', headerName: '제목', width: 200 },
  {
    field: 'note',
    headerName: '릴리즈 노트',
    width: 140,
    // editable: true,
  },
  {
    field: 'fixed',
    headerName: '상단 고정',
    width: 130,
    // editable: true,
  },
  {
    field: 'createdAt',
    headerName: '작성일',
    width: 200,
    // type: 'number',
    // editable: true,
  },
  {
    field: 'updatedAt',
    headerName: '수정일',
    width: 200,
    // description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //     params.getValue(params.id, 'lastName') || ''
    //   }`,
  },
];

const NoticeUpdateContainer = () => {
  const dispatch = useDispatch();
  const { error, list, skip, limit } = useSelector(state => state.notice);

  useMount(() => {
    dispatch(getList({skip, limit}));
  });

  return (<div>
    {list.length > 0 && <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={list}
        columns={headers}
        pageSize={limit}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>}
    {error && <div>{error}</div>}
  </div>)
};

export default NoticeUpdateContainer;
