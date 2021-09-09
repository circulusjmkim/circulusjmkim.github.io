import { Button, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useToggle } from 'react-use';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EnvSelect from '../components/EnvSelect';
import { useStyles } from '../styles/userStyle';

const UserSignupContainer = () => {
  // `모드 선택 => 아이디 검색(중복 안될경우 가입) => 회원가입 입력정보(
  // userId(string),
  // password(string),
  // lastName(string),
  // firstName(string),
  // birthDate(date.valueOf()), 
  // email||tel(string),인증정보 중복체크
  // temp: false,
  // verified({ email: false, tel: false })`
  const classes = useStyles();
  const [check, setCheck] = useToggle(false);
  const [value, setValue] = useState('');

  const handleDuplicateCheck = () => {
    setCheck(!check);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  }

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
        <Grid item xs={6} md={8} />
        <Grid item container xs={12} className={classes.margin}>
          <Grid item>
            <FormControl className={classes.marginTextField}>
              <InputLabel htmlFor="standard-adornment-userid" shrink>아이디</InputLabel>
              <Input
                id="standard-adornment-userid"
                type="text"
                inputProps={{
                  'aria-label': '아이디',
                }}
                value={value}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="userid duplicte check"
                      onClick={handleDuplicateCheck}
                      onMouseDown={handleDuplicateCheck}
                    >
                      {check ? <CheckCircleIcon /> : <CheckIcon className={classes.disabled} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="standard-weight-helper-text">{value ? '우측 버튼을 눌러 아이디 중복체크를 해주세요.':''}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.marginTextField}>
              <InputLabel htmlFor="standard-adornment-password" shrink>비밀번호</InputLabel>
              <Input
                id="standard-adornment-password"
                type="text"
                inputProps={{
                  'aria-label': '비밀번호',
                }}
                value={value}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="userid duplicte check"
                      onClick={handleDuplicateCheck}
                      onMouseDown={handleDuplicateCheck}
                    >
                      {check ? <VisibilityIcon /> : <VisibilityOffIcon className={classes.disabled} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="standard-weight-helper-text">{value ? '우측 버튼을 눌러 아이디 중복체크를 해주세요.':''}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.margin}>
          <Grid item>
            <FormControl className={classes.marginTextField}>
              <InputLabel htmlFor="standard-adornment-lastname" shrink>성</InputLabel>
              <Input
                id="standard-adornment-firtname"
                type="text"
                inputProps={{
                  'aria-label': '성',
                }}
                value={value}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
          <FormControl className={classes.marginTextField}>
            <InputLabel htmlFor="standard-adornment-firtname" shrink>이름</InputLabel>
            <Input
              id="standard-adornment-firtname"
              type="text"
              inputProps={{
                'aria-label': '이름',
              }}
              value={value}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.margin}>
          <Grid item>
            <FormControl className={classes.marginTextField}>
              <InputLabel htmlFor="standard-adornment-email" shrink>이메일</InputLabel>
              <Input
                id="standard-adornment-email"
                type="email"
                inputProps={{
                  'aria-label': '이메일',
                }}
                value={value}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.marginTextField}>
              <InputLabel htmlFor="standard-adornment-tel" shrink>전화번호</InputLabel>
              <Input
                id="standard-adornment-tel"
                type="tel"
                inputProps={{
                  'aria-label': '전화번호',
                }}
                value={value}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <TextField
            id="date"
            label="생년월일"
            type="date"
            defaultValue="2021-09-09"
            className={classes.marginTextField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} className={classes.margin}>
          <Button variant="contained" color="primary" className={classes.signupButton}>회원가입</Button>
        </Grid>
    </Grid>
  )
};

export default UserSignupContainer;
