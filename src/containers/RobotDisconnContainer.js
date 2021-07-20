import React, { useState } from 'react';
import { Grid, Button, TextField, makeStyles, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEffect } from 'react-use';
import ClearIcon from '@material-ui/icons/Clear';
import EnvSelect from '../components/EnvSelect';
import { disconnectInitial, disconnectRobot, getRobot } from '../features/robot';

const useStyles = makeStyles((theme) => ({
  root: {
    flexFlow: 1,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    '& .MuiGrid-item': {
      padding: `0 ${theme.spacing(1)}px`,
    }
  },
  marginVertical: {
    margin: 'auto 0',
  },
  textField: {
    minWidth: '300px',
    maxWidth: '300px',
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  cardRoot: {
    minWidth: 275,
    '& h6.MuiTypography-root.MuiTypography-subtitle1': {
      margin: theme.spacing(1),
      '& p': {
        margin: `${theme.spacing(1)}px 0`
      }
    }
  },
  cardValue: {
    fontWeight: 700,
    color: theme.palette.text.primary,
  },
  cellProp: {
    textAlign: 'right',
    marginRight: theme.spacing(2),
  },
  btnDisconnect: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: `${theme.palette.error.main.replace('1)', '.08)')};`,
    },
  },
  cardError: {
    width: '100%',
    maxWidth: 'fit-content',
  }
}));

const RobotDisconnContainer = () => {
  const [words, setWords] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector(state => state.robot);
  const { findError, robotData, disconnResult, disconnError } = selector;
  // const { findError } = selector;
  const classes = useStyles();

  const handleFindClick = () => {
    dispatch(getRobot(words));
  };

  const handleTextChange = (e) => {
    setWords(e.target.value);
  };

  const handleDisconnectClick = (serial) => () => {
    dispatch(disconnectRobot(serial));
  };

  const handleClickClear = () => {
    setWords('');
    dispatch(disconnectInitial());
  }

  useUpdateEffect(() => {
    if(disconnResult) {
      setTimeout(() => {
        setWords('');
        dispatch(disconnectInitial());
      }, 2000);
    }
  }, [disconnResult]);

  return (
    <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      className={classes.root}
      spacing={2}
      >
        <Grid item xs={6} md={2} className={classes.marginVertical}>
          <EnvSelect />
        </Grid>
        <Grid container item xs={12} md={10} style={{display: 'inline-flex'}}>
          <Grid item>
            <TextField
              id="standard-basic"
              className={classes.textField} 
              label='로봇의 ObjectId 또는 Serial No.를 입력하세요.'
              onChange={handleTextChange} 
              value={words}
              error={findError}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickClear}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>)
              }}
            />
          </Grid>
          <Grid item className={classes.marginVertical}>
            <Button variant="contained" color="primary"  onClick={handleFindClick}>검색</Button>
          </Grid>
        </Grid>
        {findError && (<Grid item xs={12}>
          <Typography variant="h6">{findError}</Typography>
        </Grid>)}
        <Grid container item xs={12}>
          {robotData.map(({_id: id, robotId, userId, }) => (
            <Grid item>
              <Card className={classes.cardRoot} key={id}>
                <CardContent>
                  {
                    !disconnResult && (
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.cellProp}>
                              <Typography color="textSecondary">
                                userId
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <span className={classes.cardValue}>{userId}</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.cellProp}>
                              <Typography color="textSecondary">
                                ObjectId
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <span className={classes.cardValue}>{id}</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.cellProp}>
                              <Typography color="textSecondary">
                                Serial No.
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <span className={classes.cardValue}>{robotId}</span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>)
                  }
                  <Typography variant="subtitle1">
                    {
                      disconnResult === null && (
                      <>
                        <p>{`${userId} 사용자와 시리얼 ${robotId} 로봇의`}</p>
                        <p>연결을 해제하시겠습니까?</p>
                      </>
                      )
                    }
                    {
                      disconnResult === false && <Typography variant="body2" color="textSecondary" className={classes.cardError}>{disconnError}</Typography>
                    }
                    {
                      disconnResult && !disconnError && (
                        <>
                          <p>{`${userId} 사용자와 시리얼 ${robotId} 로봇이`}</p>
                          <p>연결 해제되었습니다.</p>
                        </>
                        )
                    }
                  </Typography>
                  {disconnResult && !disconnError && (
                    <Typography variant="body2" color="textSecondary">해당 카드는 자동으로 사라집니다.</Typography>
                  )}
                </CardContent>
                {
                  !disconnResult && (
                    <CardActions>
                      <Button size="small" color="primary" className={classes.btnDisconnect} onClick={handleDisconnectClick(robotId)}>연결 해제</Button>
                    </CardActions>
                  )
                }
              </Card>
            </Grid>
          ))}
        </Grid>
    </Grid>
  )
};

export default RobotDisconnContainer;
