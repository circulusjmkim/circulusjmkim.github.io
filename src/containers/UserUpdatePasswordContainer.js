import React, { useState } from 'react';
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
  updatePassword,
} from '../features/user';
import { useStyles } from '../styles/robotStyle';
import { validatePassword } from '../core/utils/validate';

const UserUpdatePasswordContainer = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const { dataError, data, result, error, params } = selector;
  const { words } = params;
  const [pw, setPw] = useState('');
  const [validateError, setError] = useState(null);
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
    setPw('');
  };

  const handleUpdateClick = () => {
    dispatch(updatePassword({ userId: words, pw }));
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
    setError(validatePassword(e.target.value));
  };

  const handleClickPasswordClear = () => {
    setPw('');
  };

  useUpdateEffect(() => {
    if (result) {
      setTimeout(() => {
        setPw('');
        dispatch(initialize());
      }, 2000);
    }
  }, [result]);

  useMount(() => dispatch(initialize()));
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
            비밀번호를 변경할 사용자의 아이디를 입력하세요.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="standard-basic"
            onChange={handleTextChange}
            value={words || ''}
            error={!!dataError}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="user id input value clear"
                    onClick={handleClickClear}
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
      <Grid container item xs={12} className={classes.cardGrid} spacing={1}>
        {data.map(({ id, userId, role }) => (
          <Grid xs={6} item key={id}>
            <Card className={classes.cardRoot} key={id}>
              <CardContent>
                {!result && (
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.cellProp}>
                          <Typography color="textSecondary">userId</Typography>
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
                          <Typography color="textSecondary">권한</Typography>
                        </TableCell>
                        <TableCell>
                          <span className={classes.cardValue}>{role}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.cellProp}>
                          <Typography color="textSecondary">
                            비밀번호 입력
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <TextField
                            id="new-password"
                            name="new-password"
                            label="변경할 비밀번호를 입력하세요."
                            onChange={handlePasswordChange}
                            value={pw || ''}
                            error={!!validateError}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="new password clear button"
                                    onClick={handleClickPasswordClear}
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            sx={{ my: 2 }}
                            helperText={validateError}
                            fullWidth
                          />
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                          <TableCell className={classes.cellProp}>
                            <Typography color="textSecondary">
                              수정일
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <span className={classes.cardValue}>{updatedAt}</span>
                          </TableCell>
                        </TableRow> */}
                    </TableBody>
                  </Table>
                )}
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
                      <p>{`${userId}(${id}) 의 비밀번호가`}</p>
                      <p>변경되었습니다.</p>
                    </>
                  )}
                </Typography>
                {result && !error && (
                  <Typography variant="body2" color="textSecondary">
                    해당 카드는 자동으로 사라집니다.
                  </Typography>
                )}
              </CardContent>
              {!result && (
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleUpdateClick}
                  >
                    비밀번호 변경
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

export default UserUpdatePasswordContainer;
