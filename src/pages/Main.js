import React, { Fragment, useEffect } from 'react';
import { Container, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import FullWidthTabs from '../components/FullWidthTabs';
import { MENUS } from '../core/utils/consts';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Content from '../components/Content';
import { useHistory } from 'react-router';
import { useLocation } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { setItem, setTab, setHome } from '../features/page';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiContainer-root': {
      paddingLeft: 0,
      paddingRight: 0,
    }
  },

  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    // margin: theme.spacing(1),
    '&>img': {
      '@media (min-width: 600px)': {
        margin: theme.spacing(2),
        height: '5rem',
        width: 'auto',
      },
      '@media (max-width: 600px)': {
        margin: theme.spacing(1),
        height: '3.2rem',
        width: 'auto',
      }
    },
    '& .MuiTypography-h3': {
      margin: theme.spacing(1),
      '@media (max-width: 600px)': {
        marginBottom: theme.spacing(1),
        fontSize: '20px',
      }
    }
  },
  menutab: {
    background: `${theme.palette.grey['900']}`,
    boxShadow: `${theme.shadows[5]}`,
    '& .MuiPaper-elevation4': {
      boxShadow: 'none',
    },
    '& .MuiTab-wrapper': {
      '@media (max-width: 600px)': {
        lineHeight: 1.25,
      }
    }
  },
  subheader: {
    margin: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    color: theme.palette.text.secondary,
    '@media (max-width: 600px)': {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      fontSize: '16px',
    }
  },
  list: {
    '& .MuiGrid-item': {
      width: '100%',
    },
    '& .MuiGrid-grid-xs-12': {
      maxWidth: 250,
    },
    // borderRight: `1px solid ${theme.palette.divider}`,
    '& .MuiList-padding': {
      padding: 0,
    },
    '& .MuiListItem-button': {
      '&:hover': {
        backgroundColor: 'rgba(8, 131, 189, .3)'
      }
    },
    '& .MuiListItem-root.Mui-selected': {
      '&:hover': {
        backgroundColor: 'rgba(8, 131, 189, .5)'
      },
      backgroundColor: 'rgba(8, 131, 189, .5)'
    }
  },
  content: {
    padding: theme.spacing(2),
    '& .MuiTypography-subtitle2': {
      color: theme.palette.secondary.light,
    }
  }
}));

const Main = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.page);
  const { tab, item, home } = selector;
  const { pathname } = useLocation();
  const smMatches = useMediaQuery('(min-width:600px)');

  const handleTabChange = (v) => {
    dispatch(setTab({tab: v}));
    if(v > -1) {
      history.push(`/${MENUS[v].value}`);
    }
  };

  const handleListItemClick = (v) => {
    dispatch(setItem(v));
  };

  useEffect(() => {
    const tabItemIndex = MENUS.findIndex(({ value }) => pathname === `/${value}`);
    dispatch(setTab({tab: tabItemIndex, item: 0}));
    dispatch(setHome(pathname==='/'));
  }, [pathname]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container>
          <Header {...{title: 'Admin Control'}} />
          <FullWidthTabs {...{list: MENUS, value: tab, classes, onChange: handleTabChange}} />
          {home && <Fragment>{children}</Fragment>}
          {
            tab > -1 && (
              <Fragment>
                {(!home || smMatches) && <SubHeader {...{classes, desc: MENUS[tab].desc}} />}
                {!home && <Content {...{tab, item, classes, handleListItemClick}}>
                  {children}
                </Content>}
              </Fragment>
            )
          }
        </Grid>
      </Container>
    </div>
  );
};

export default Main;
