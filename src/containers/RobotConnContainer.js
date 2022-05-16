/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Grid,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  Table,
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import ClearIcon from '@mui/icons-material/Clear';
import EnvSelect from '../components/EnvSelect';
import {
  initialize,
  findClick,
  textChange,
  clearClick,
  connectRobot,
  addTextField,
  addSerialChange,
} from '../features/robot';
import { useStyles } from '../styles/robotStyle';
import { ROLE_MANAGER } from '../core/utils/consts';

const RobotConnContainer = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.robot);
  const { dataError, data, result, error, params } = selector;
  const { userId, robots } = params;
  const classes = useStyles();

  const handleFindClick = () => {
    dispatch(findClick());
  };

  const handleTextChange = (e, ...rest) => {
    dispatch(textChange(e));
  };

  const handleSerialTextChange = (i) => (e) => {
    dispatch(addSerialChange(e, i));
  };

  const handleBlurChange = () => {
    dispatch(addTextField());
  };

  const handleClickClear = (index) => () => {
    dispatch(clearClick('robots', index));
  };

  const handleConnectClick = () => {
    dispatch(connectRobot({ serial: robots, userId }));
  };

  useUpdateEffect(() => {
    if (result) {
      setTimeout(() => {
        dispatch(initialize());
      }, 2000);
    }
  }, [result]);

  useMount(() => {
    dispatch(initialize());
  });

  const getRole = (role, list) => {
    if (role === ROLE_MANAGER) {
      return true;
    }
    return list ? list.length === 0 : false;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      rowGap={2}
      className={classes.root}
    >
      <Grid item xs={6} md={2} className={classes.marginVertical}>
        <EnvSelect />
      </Grid>
      <Grid container item xs={12} md={10} gap={1} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="body2">
            로봇을 연결할 userId를 입력하세요.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="userId"
            name="userId"
            onChange={handleTextChange}
            value={userId || ''}
            error={!!dataError}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickClear('userId')}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item className={classes.marginVertical}>
          <Button variant="contained" color="primary" onClick={handleFindClick}>
            검색
          </Button>
        </Grid>
      </Grid>
      {dataError && (
        <Grid item xs={12}>
          <Typography variant="h6">{dataError}</Typography>
        </Grid>
      )}
      <Grid container item xs={12} md={10}>
        {data.map(({ id, userId: resultId, list, role }) => (
          <Grid item xs={4} key={id}>
            <Card>
              <CardContent>
                {!result && (
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.cellProp}>
                          <Typography color="textSecondary">userId</Typography>
                        </TableCell>
                        <TableCell>
                          <span className={classes.cardValue}>{resultId}</span>
                          {role === ROLE_MANAGER && (
                            <Chip
                              size="small"
                              label="매니저"
                              className={classes.roleChip}
                            />
                          )}
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
                          {list &&
                            list.map(({ robotId: rId, serial }) => (
                              <p
                                className={classes.cardValue}
                                key={rId}
                              >{`${serial} (${rId})`}</p>
                            ))}
                          {list.length === 0 && (
                            <span className={classes.cardValue}>없음</span>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
                {!result &&
                  !dataError &&
                  getRole(role, list) &&
                  robots &&
                  robots.map((robotId, index) => (
                    <TextField
                      key={`robot_${index}`}
                      id="robotId"
                      name="robotId"
                      label="새로운 로봇의 Serial No.를 입력하세요."
                      value={robotId}
                      onChange={handleSerialTextChange(index)}
                      onBlur={handleBlurChange}
                      error={!!dataError}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickClear(index)}>
                              <ClearIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ my: 2 }}
                      fullWidth
                    />
                  ))}
                {(error || result) && (
                  <Typography variant="subtitle1">
                    {result === false && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.cardError}
                      >
                        {error}
                      </Typography>
                    )}
                    {result && !error && (
                      <>
                        <p>{`${userId} 사용자에 ${robots.join(', ')}의`}</p>
                        <p>로봇이 연결되었습니다.</p>
                      </>
                    )}
                  </Typography>
                )}
                {!result && !getRole(role, list) && (
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.cardError}
                  >
                    이미 연결된 로봇이 있습니다.
                  </Typography>
                )}
              </CardContent>
              {!result && getRole(role, list) && (
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={handleConnectClick}
                    fullWidth
                  >
                    연결
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default RobotConnContainer;
