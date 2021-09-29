import React from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import ClearIcon from '@material-ui/icons/Clear';
import EnvSelect from '../components/EnvSelect';
import { initialize, findClick, textChange, clearClick, clearRobot } from '../features/robot';
import { useStyles } from '../styles/robotStyle';

const RobotClearDataContainer = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.robot);
  const { dataError, data, result, error, params } = selector;
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

  const handleClearRobotClick = (serial) => () => {
    dispatch(clearRobot(serial));
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
      direction="column"
      justifyContent="flex-start"
      className={classes.root}
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
                  aria-label="robot id input value clear"
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
        <Grid container item xs={12} className={classes.cardGrid}>
          {data.map(({_id: id, robotId, userId, use, createdAt, updatedAt }) => (
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
                          <TableRow>
                            <TableCell className={classes.cellProp}>
                              <Typography color="textSecondary">
                                use
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <span className={classes.cardValue}>{use.toString()}</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.cellProp}>
                              <Typography color="textSecondary">
                                생성일
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <span className={classes.cardValue}>{createdAt}</span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.cellProp}>
                              <Typography color="textSecondary">
                                수정일
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <span className={classes.cardValue}>{updatedAt}</span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>)
                  }
                  <Typography variant="subtitle1">
                    {
                      result === null && (
                      <>
                        <p>{`해당 시리얼(${robotId})의 로봇`}</p>
                        <p>데이터를 모두 삭제하시겠습니까?</p>
                      </>
                      )
                    }
                    {
                      result === false && <Typography variant="body2" color="textSecondary" className={classes.cardError}>{error}</Typography>
                    }
                    {
                      result && !error && (
                        <>
                          <p>{`${robotId} 시리얼 로봇의`}</p>
                          <p>데이터가 모두 삭제되었습니다.</p>
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
                      <Button size="small" className={classes.btnDisconnect} onClick={handleClearRobotClick(id)}>데이터 클리어</Button>
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
