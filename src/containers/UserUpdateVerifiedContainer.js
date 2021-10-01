import React, { useState } from 'react';
import { Grid, Button, TextField, Card, CardContent, Typography, CardActions, Table, TableBody, TableRow, TableCell, InputAdornment, IconButton, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMount, useUpdateEffect } from 'react-use';
import ClearIcon from '@material-ui/icons/Clear';
import EnvSelect from '../components/EnvSelect';
import { initialize, findClick, textChange, clearClick, updateVerifiedInfo, setError } from '../features/user';
import { useStyles } from '../styles/robotStyle';
import { validateEmail, validateTel } from '../core/utils/validate';

const UserUpdateVerifiedContainer = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);
  const { dataError, data, result, error, params } = selector;
  const { words } = params;
  const [v, setValue] = useState({tel: '', email: ''});
  const [validateError, setChangeError] = useState({email: null, tel: null});
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
    setValue({tel: '', email: ''});
  };

  const handleUpdateClick = () => {
    const { tel, email } = data[0];
    const obj = { userId: words, tel: v.tel || tel, email: v.email || email};
    dispatch(updateVerifiedInfo(obj));
  };

  const handleValueChange = (e) => {
    dispatch(setError(''));
    const { value, name } = e.target;
    if(name === 'new-tel') {
      setValue({ ...v, tel: value});
      setChangeError({...validateError, tel: validateTel({value})});
    }
    if(name === 'new-email') {
      setValue({ ...v, email: value});
      setChangeError({...validateError, email: validateEmail({value})});
    }
  };

  const handleClickTelClear = () => {
    setValue({...v, tel: ''});
  };

  const handleClickEmailClear = () => {
    setValue({...v, email: ''});
  };

  useUpdateEffect(() => {
    if(result) {
      setTimeout(() => {
        setValue({tel: '', email: ''});
        dispatch(initialize());
      }, 2000);
    }
  }, [result]);

  useMount(() => dispatch(initialize()));
  return (<Grid container
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
            label='인증 정보를 변경할 사용자의 아이디를 입력하세요.'
            onChange={handleTextChange} 
            value={words || ''}
            error={!!dataError}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (<InputAdornment position="end">
              <IconButton
                aria-label="user id input value clear"
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
      <Grid container item xs={12} className={classes.cardGrid} spacing={1}> 
        {data.map(({ id, userId, role, email, tel }) => (
          <Grid item key={id}>
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
                              권한
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <span className={classes.cardValue}>{role}</span>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.cellProp}>
                            <Typography color="textSecondary">
                              전화번호
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <FormControl className={classes.marginTextField} error={!!error || !!validateError.tel}>
                              <InputLabel htmlFor="new-tel" shrink>변경할 전화번호를 입력하세요.</InputLabel>
                              <Input
                                id="new-tel"
                                name="new-tel"
                                className={classes.textField} 
                                type="tel"
                                value={v.tel|| tel || ''}
                                onChange={handleValueChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="new password clear button"
                                      onClick={handleClickTelClear}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText>{validateError.tel}</FormHelperText>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.cellProp}>
                            <Typography color="textSecondary">
                              이메일
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <FormControl className={classes.marginTextField} error={!!error || !!validateError.email}>
                              <InputLabel htmlFor="new-email" shrink>변경할 이메일을 입력하세요.</InputLabel>
                              <Input
                                id="new-email"
                                name="new-email"
                                className={classes.textField} 
                                type="email"
                                value={v.email || email || ''}
                                onChange={handleValueChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="new email clear button"
                                      onClick={handleClickEmailClear}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText color="error">{validateError.email}</FormHelperText>
                            </FormControl>
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
                    </Table>)
                }
                <Typography variant="subtitle1">
                  {
                    result === false && <Typography variant="body2" color="textPrimary" className={classes.cardError}>{error}</Typography>
                  }
                  {
                    result && !error && (
                      <>
                        <p>{`${userId}(${id})의 인증정보가`}</p>
                        <p>변경되었습니다.</p>
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
                    <Button size="small" color="primary" onClick={handleUpdateClick}>인증정보 변경</Button>
                  </CardActions>
                )
              }
            </Card>
          </Grid>
        ))}
      </Grid>
  </Grid>
)};

export default UserUpdateVerifiedContainer;
