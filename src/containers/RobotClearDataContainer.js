import React, { useState } from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import ClearIcon from '@material-ui/icons/Clear';
import EnvSelect from '../components/EnvSelect';
import { robotInitialize, disconnectRobot, getRobot } from '../features/robot';
import { useStyles } from '../styles/robotStyle';

const RobotClearDataContainer = () => {
  const [words, setWords] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector(state => state.robot);
  const { findError, robotData, clearResult, clearError } = selector;
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
    if(clearResult) {
      setTimeout(() => {
        setWords('');
        dispatch(robotInitialize());
      }, 2000);
    }
  }, [clearResult]);

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
                    !clearResult && (
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
                      clearResult === null && (
                      <>
                        <p>{`해당 시리얼의 ${robotId} 로봇`}</p>
                        <p>데이터를 모두 삭제하시겠습니까?</p>
                      </>
                      )
                    }
                    {
                      clearResult === false && <Typography variant="body2" color="textSecondary" className={classes.cardError}>{clearError}</Typography>
                    }
                    {
                      clearResult && !clearError && (
                        <>
                          <p>{`${robotId} 시리얼 로봇의`}</p>
                          <p>데이터가 모두 삭제되었습니다.</p>
                        </>
                        )
                    }
                  </Typography>
                  {clearResult && !clearError && (
                    <Typography variant="body2" color="textSecondary">해당 카드는 자동으로 사라집니다.</Typography>
                  )}
                </CardContent>
                {
                  !clearResult && (
                    <CardActions>
                      <Button size="small" className={classes.btnDisconnect} onClick={handleDisconnectClick(robotId)}>데이터 클리어</Button>
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

export default RobotClearDataContainer;
