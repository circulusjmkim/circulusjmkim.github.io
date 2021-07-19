import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
// import { Chip, Container, makeStyles, Typography } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { useHistory } from 'react-router';

import BgLogo from '../assets/bg_logo.png';

const useHomeStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '5rem 0',
  },
  container: {
    width: '100%',
    zIndex: '1500',
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
    height: '100%',
    padding: theme.spacing(3),
    '& > *': {
      marginBottom: theme.spacing(4),
      filter: `drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.12)) drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.12))`,
      wordBreak: 'keep-all',
    },
  },
  chip: {
    '&.MuiButtonBase-root.MuiChip-root': {
      padding: theme.spacing(1, 3),
      fontSize: '1.1em',
      lineHeight: '1.7em',
    },
  },
}));

const Home = () => {
  const classes = useHomeStyle();
  // const history = useHistory();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.container}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          파이보 모바일과 관련된 사용자, 로봇, 공지사항을 관리할 수 있는 관리자 페이지입니다.
        </Typography>
        {/* <Chip
          label="로그인"
          onClick={() => history.push('/signin')}
          onDelete={() => history.push('/signin')}
          deleteIcon={<ChevronRightIcon />}
          variant="outlined"
          className={classes.chip}
        /> */}
      </Container>
    </div>
  );
};

export default Home;
