import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EnvSelect from './EnvSelect';

const SignUpForm = ({
  classes,
  error,
  data,
  idChecked,
  visible,
  enable,
  handleSignUp,
  handleVisible,
  handleBlur,
  handleChange,
  handleDuplicateCheck,
  handleRadioChange,
}) => (
  <Grid
    container
    direction="row"
    justifyContent="flex-start"
    alignItems="stretch"
    className={classes.root}
    spacing={2}
  >
    <Grid item xs={6} md={2} className={classes.marginVertical}>
      <EnvSelect />
    </Grid>
    <Grid item xs={6} md={8} className={classes.toggleWrap}>
      <FormControl sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <FormLabel id="types-buttons-group-label" sx={{ mr: 2 }}>
          구분
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="types-buttons-group-label"
          name="types-radio-buttons-group"
          onChange={handleRadioChange}
          defaultValue={data.role}
        >
          <FormControlLabel value="0000" control={<Radio />} label="일반" />
          <FormControlLabel value="0110" control={<Radio />} label="매니저" />
          <FormControlLabel
            value="1110"
            control={<Radio />}
            label="매니저 관리자"
          />
        </RadioGroup>
      </FormControl>
    </Grid>
    <Grid item container xs={12} className={classes.margin} spacing={2}>
      <Grid item xs={6}>
        <TextField
          id="userid"
          name="userId"
          type="text"
          label="아이디"
          value={data.userId}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="userid duplicte check"
                  onClick={handleDuplicateCheck}
                  onMouseDown={handleDuplicateCheck}
                >
                  {idChecked ? (
                    <CheckCircleIcon />
                  ) : (
                    <CheckIcon className={classes.disabled} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            error && error.userId
              ? error.userId
              : !idChecked && '우측 버튼을 눌러 아이디 중복체크를 해주세요.'
          }
          error={!!(error && error.userId)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="password"
          name="password"
          type={visible ? 'text' : 'password'}
          label="비밀번호"
          value={data.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="password duplicte check"
                  onClick={handleVisible}
                  onMouseDown={handleVisible}
                >
                  {visible ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon className={classes.disabled} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={error && error.password}
          error={!!(error && error.password)}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="lastname"
          name="lastName"
          type="text"
          label="성"
          value={data.lastName}
          onChange={handleChange}
          helperText={error && error.lastName}
          error={!!(error && error.lastName)}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="firstName"
          name="firstName"
          type="text"
          label="이름"
          value={data.firstName}
          onChange={handleChange}
          helperText={error && error.firstName}
          error={!!(error && error.firstName)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="date"
          name="birthDate"
          type="date"
          label="생년월일"
          value={data.birthDate}
          onChange={handleChange}
          helperText={error && error.birthDate}
          error={!!(error && error.birthDate)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="이메일"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={error && error.email}
          error={!!(error && error.email)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="tel"
          name="tel"
          type="tel"
          label="전화번호"
          value={data.tel}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={error && error.tel}
          error={!!(error && error.tel)}
          fullWidth
        />
      </Grid>
      {['0110', '1110'].includes(data.role) && (
        <Grid item xs={6}>
          <TextField
            id="institution"
            name="institution"
            type="institution"
            label="기관명"
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </Grid>
      )}
      <Grid item xs={12} className={classes.margin}>
        <Button
          variant="contained"
          color="primary"
          className={classes.signupButton}
          disabled={!enable}
          onClick={handleSignUp}
          fullWidth
        >
          회원가입
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

export default SignUpForm;
