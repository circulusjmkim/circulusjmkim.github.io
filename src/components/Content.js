import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Divider, useMediaQuery } from '@material-ui/core';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import { MENUS } from '../core/utils/consts';
import SubList from './SubList';
import ContentDescription from './ContentDescription';

const Content = ({ tab, item, classes, handleListItemClick, children }) => {
  const mobileMatches = useMediaQuery('(max-height:767px)');
  const [list, setList] = useState(MENUS[tab].list);
  const [fold, setFold] = useState(null);

  const handleFoldClick = () => {
    setFold(!fold);
  };

  useEffect(() => {
    setFold(mobileMatches);
  }, [mobileMatches]);

  useEffect(() => {
    setList(MENUS[tab].list);
  }, [tab]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item xs={12} sm={4} md={3} lg={2}>
        {
          list.map(({ value, label }, i) => (
            <SubList {...{key: `${value}-${i}`, index: i, label, classes, value, selected: item === i, fold, onChange: handleListItemClick}} />
          ))
        }
        {mobileMatches && (<IconButton aria-label="fold" onClick={handleFoldClick} style={{width: '100%', padding: '6px 0'}}>
          {!fold && <ExpandLessOutlinedIcon />}
          {fold && <ExpandMoreOutlinedIcon />}
        </IconButton>)}
        {mobileMatches && <Divider />}
      </Grid>
      <Grid item xs={12} sm={8} md={9} lg={10}>
        <div className={classes.content}>
          <ContentDescription desc={list[item].desc} />
          <div>{children}</div>
        </div>
      </Grid>
    </Grid>
  )
}

export default Content;