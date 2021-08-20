import React from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton, Chip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import ClearIcon from '@material-ui/icons/Clear';
import EnvSelect from '../components/EnvSelect';
import { initialize, findClick, textChange, clearClick, connectRobot } from '../features/robot';
import { useStyles } from '../styles/robotStyle';
import { MANAGER_ROLE } from '../core/utils/consts';

const RobotConnContainer = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.robot);
  const { dataError, data, result, error, params } = selector;
  const { userId, robotId } = params;
  const classes = useStyles();

  const handleFindClick = () => {
    dispatch(findClick());
  };

  const handleTextChange = (e) => {
    dispatch(textChange(e));
  };

  const handleClickClear = (name) => () => {
    dispatch(clearClick(name));
  }

  const handleConnectClick = () => {
    dispatch(connectRobot({ serial: robotId, userId }));
  };

  useUpdateEffect(() => {
    if(result) {
      setTimeout(() => {
        dispatch(initialize());
      }, 2000);
    }
  }, [result]);

  useMount(() => {
    dispatch(initialize());
  });

  const getRole = (role, list) => {
    if(role === MANAGER_ROLE) {
      return true;
    }
    return list.length !== 0;
  };

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
              id="userId"
              name="userId"
              className={classes.smallTextField} 
              label='로봇을 연결할 userId를 입력하세요.'
              onChange={handleTextChange} 
              value={userId || ''}
              error={dataError}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickClear('userId')}
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
          {data.map(({id, userId: resultId, list, role}) => (
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
                              <span className={classes.cardValue}>{resultId}</span>
                              {
                                role === MANAGER_ROLE && <Chip size="small" label="매니저" className={classes.roleChip} />
                              }
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
                                robot list
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {
                                 
                                getRole(role, list)&& list.map(({robotId:rId, serial}) => (<p className={classes.cardValue}>{`${serial} (${rId})`}</p>))
                              }
                              {
                                !getRole(role, list)&& (<span className={classes.cardValue}>없음</span>)
                              }
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>)
                  }
                  {
                    (!result && !dataError && (!getRole(role, list)|| role === MANAGER_ROLE)) && (
                      <TextField
                        id="robotId"
                        name="robotId"
                        className={classes.cardTextField} 
                        label='새로운 로봇의 Serial No.를 입력하세요.'
                        onChange={handleTextChange} 
                        value={robotId}
                        error={dataError}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          endAdornment: (<InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickClear('robotId')}
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>)
                        }}
                      />
                    )
                  }
                  {
                    (error || result) && (
                      <Typography variant="subtitle1">
                        {
                          result === false && <Typography variant="body2" color="textSecondary" className={classes.cardError}>{error}</Typography>
                        }
                        {
                          result && !error && (
                            <>
                              <p>{`${userId} 사용자에 ${robotId}의`}</p>
                              <p>로봇이 연결되었습니다.</p>
                            </>
                            )
                        }
                      </Typography>
                    )
                  }
                  {
                    (!result && getRole(role, list)&& role !== MANAGER_ROLE) && (
                      <Typography variant="subtitle1" color="textSecondary" className={classes.cardError}>이미 연결된 로봇이 있습니다.</Typography>
                    )
                  }
                </CardContent>
                {
                  (!result && (!getRole(role, list)|| role === MANAGER_ROLE)) && (
                    <CardActions>
                      <Button size="small" color="secondary" className={classes.btn} onClick={handleConnectClick}>연결</Button>
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
