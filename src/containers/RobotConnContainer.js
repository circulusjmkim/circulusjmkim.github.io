import React, { useState } from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import ClearIcon from '@material-ui/icons/Clear';
import EnvSelect from '../components/EnvSelect';
import { robotInitialize, disconnectRobot, getRobot } from '../features/robot';
import { useStyles } from '../styles/robotStyle';

const RobotConnContainer = () => {
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
    dispatch(robotInitialize());
  }

  useUpdateEffect(() => {
    if(disconnResult) {
      setTimeout(() => {
        setWords('');
        dispatch(robotInitialize());
      }, 2000);
    }
  }, [disconnResult]);

  useMount(() => dispatch(robotInitialize()));

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
                      <Button size="small" className={classes.btnDisconnect} onClick={handleDisconnectClick(robotId)}>연결 해제</Button>
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

export default RobotConnContainer;
