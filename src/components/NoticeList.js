import React from 'react';
import { DataGrid } from "@material-ui/data-grid"
import { Grid } from '@material-ui/core';
import EnvSelect from './EnvSelect';

const NoticeList = ({ list, headers, limit, visible, error, handleListInit }) => (
  <>
  {visible && (
    <Grid container item xs={12}>
      <Grid item xs={3}>
        <EnvSelect onChange={handleListInit} />
      </Grid>
      <Grid item xs={12} style={{ paddingLeft: '1rem'}}>
        <div style={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={list}
            columns={headers}
            pageSize={limit}
            // checkboxSelection
            disableSelectionOnClick
          />
          <div>
            {error && <div>{error}</div>}
          </div>
        </div>    
      </Grid>
    </Grid>
    )}
    </>
  );

export default NoticeList;
