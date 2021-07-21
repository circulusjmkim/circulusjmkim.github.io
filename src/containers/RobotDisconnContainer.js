import React from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import ClearIcon from '@material-ui/icons/Clear';
import EnvSelect from '../components/EnvSelect';
import { initialize, findClick, textChange, clearClick, disconnectRobot } from '../features/robot';
import { useStyles } from '../styles/robotStyle';

const RobotDisconnContainer = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.robot);
  const { dataError, data, result, error, params} = selector;
  const { words } = params;
  // const { dataError } = selector;
  const classes = useStyles();

  const handleFindClick = () => {
    dispatch(findClick());
  };

  const handleTextChange = (e) => {
    dispatch(textChange(e));
  };

  const handleClickClear = (e) => {
    dispatch(clearClick(e));
  };

  const handleDisconnectClick = (serial) => () => {
    dispatch(disconnectRobot(serial));
  };

  useUpdateEffect(() => {
    if(result) {
      setTimeout(() => {
        dispatch(initialize());
      }, 2000);
    }
  }, [result]);

  useMount(() => dispatch(initialize()));

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
              value={words || ''}
              error={dataError}
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
        {dataError && (<Grid item xs={12}>
          <Typography variant="h6">{dataError}</Typography>
        </Grid>)}
        <Grid container item xs={12}>
          {data.map(({_id: id, robotId, userId, }) => (
            <Grid item>
              <Card className={classes.cardRoot} key={id}>
                <CardContent>
                  {
                    !result && (
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
                      result === null && (
                      <>
                        <p>{`${userId} 사용자와 시리얼 ${robotId} 로봇의`}</p>
                        <p>연결을 해제하시겠습니까?</p>
                      </>
                      )
                    }
                    {
                      result === false && <Typography variant="body2" color="textSecondary" className={classes.cardError}>{error}</Typography>
                    }
                    {
                      result && !error && (
                        <>
                          <p>{`${userId} 사용자와 시리얼 ${robotId} 로봇이`}</p>
                          <p>연결 해제되었습니다.</p>
                        </>
                        )
                    }
                  </Typography>
                  {result && !error && (
                    <Typography variant="body2" color="textSecondary">해당 카드는 자동으로 사라집니다.</Typography>
                  )}
                </CardContent>
                {
                  !result && (
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

export default RobotDisconnContainer;
