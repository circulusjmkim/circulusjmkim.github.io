import { Button, FormControl, FormGroup, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core';
import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import EnvSelect from './EnvSelect';
import AntSwitch from './AntSwitch';

const SignUpForm = ({ classes, error, data, bManager, idChecked, visible, enable, handleSignUp, handleVisible, handleBlur, handleChange, handleToggleChange, handleDuplicateCheck}) => (
  <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      className={classes.root}
      spacing={2}
      >
        <Grid item xs={6} md={2} className={classes.marginVertical}>
          <EnvSelect/>
        </Grid>
        <Grid item xs={6} md={8} className={classes.toggleWrap}>
          <FormGroup>
            <Typography component="div">
              <Grid component="label" container item alignItems="center" spacing={1}>
                <Grid item>일반</Grid>
                <Grid item>
                  <AntSwitch checked={bManager} onChange={handleToggleChange} className={classes.switch} />
                </Grid>
                <Grid item>매니저</Grid>
              </Grid>
            </Typography>
          </FormGroup>
        </Grid>
        <Grid item container xs={12} className={classes.margin}>
          <Grid item>
            <FormControl className={classes.marginTextField} error={error && error.userId}>
              <InputLabel htmlFor="userid" shrink>아이디</InputLabel>
              <Input
                id="userid"
                name="userId"
                type="text"
                inputProps={{
                  'aria-label': '아이디',
                }}
                value={data.userId}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="userid duplicte check"
                      onClick={handleDuplicateCheck}
                      onMouseDown={handleDuplicateCheck}
                    >
                      {idChecked ? <CheckCircleIcon /> : <CheckIcon className={classes.disabled} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{error && error.userId ? error.userId : !idChecked && '우측 버튼을 눌러 아이디 중복체크를 해주세요.'}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.marginTextField} error={error && error.password}>
              <InputLabel htmlFor="password" shrink>비밀번호</InputLabel>
              <Input
                id="password"
                name="password"
                type={visible?"text":"password"}
                inputProps={{
                  'aria-label': '비밀번호',
                }}
                value={data.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="password duplicte check"
                      onClick={handleVisible}
                      onMouseDown={handleVisible}
                    >
                      {visible ? <VisibilityIcon /> : <VisibilityOffIcon className={classes.disabled} />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{error && error.password}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.margin}>
          <Grid item>
            <FormControl className={classes.halfTextField} error={error && error.lastName}>
              <InputLabel htmlFor="lastname" name="lastName" shrink>성</InputLabel>
              <Input
                id="lastname"
                name="lastName"
                type="text"
                inputProps={{
                  'aria-label': '성',
                }}
                value={data.lastName}
                onChange={handleChange}
              />
              <FormHelperText>{error && error.lastName}</FormHelperText> 
            </FormControl>
            <FormControl className={classes.halfTextField} error={error && error.firstName}>
            <InputLabel htmlFor="firstname" name="firstName" shrink>이름</InputLabel>
            <Input
              id="firstname"
              name="firstName"
              type="text"
              inputProps={{
                'aria-label': '이름',
              }}
              value={data.firstName}
              onChange={handleChange}
            />
            <FormHelperText>{error && error.firstName}</FormHelperText>
          </FormControl>
          </Grid>
          <Grid item>
            <FormControl error={error && error.birthDate}>
              <TextField
                id="date"
                name="birthDate"
                label="생년월일"
                type="date"
                defaultValue={data.birthDate}
                className={classes.marginTextField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            <FormHelperText>{error && error.birthDate}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container xs={12} className={classes.margin}>
          <Grid item>
            <FormControl className={classes.marginTextField} error={error && error.email}>
              <InputLabel htmlFor="email" name="email" shrink>이메일</InputLabel>
              <Input
                id="email"
                name="email"
                type="email"
                inputProps={{
                  'aria-label': '이메일',
                }}
                value={data.email}
                onChange={handleChange}
                onBlur={handleBlur}

              />
              <FormHelperText>{error && error.email}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.marginTextField} error={error && error.tel}>
              <InputLabel htmlFor="tel" name="tel" shrink>전화번호</InputLabel>
              <Input
                id="tel"
                name="tel"
                type="tel"
                inputProps={{
                  'aria-label': '전화번호',
                }}
                value={data.tel}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormHelperText>{error && error.tel}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        
        <Grid item xs={12} className={classes.margin}>
          <Button variant="contained" color="primary" className={classes.signupButton} disabled={!enable} onClick={handleSignUp}>회원가입</Button>
        </Grid>
    </Grid>
);

export default SignUpForm;