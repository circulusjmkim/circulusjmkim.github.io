import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useToggle, useUpdateEffect } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../styles/userStyle';
import {
  checkId,
  checkInfo,
  initialize,
  setRole,
  signUp,
  textChange,
} from '../features/signup';
import SignUpForm from '../components/SignUpForm';

const UserSignupContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.signup);
  const { data, error, idChecked, saved } = selector;
  const [visible, setVisible] = useToggle(false);
  const [enable, setEnable] = useToggle(false);

  const handleDuplicateCheck = () => {
    dispatch(checkId(data.userId));
  };

  const handleChange = (e) => {
    dispatch(textChange(e));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value) {
      dispatch(checkInfo({ name, value }));
    }
  };

  const handleSignUp = () => {
    dispatch(signUp());
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    dispatch(setRole(e.target.value));
  };

  useUpdateEffect(() => {
    if (saved) {
      setTimeout(() => {
        dispatch(initialize());
      }, 2000);
    }
  }, [saved]);

  useUpdateEffect(() => {
    if (idChecked) {
      const result = Object.values(data).reduce((prev, curr) => {
        if (typeof curr === 'string' && curr) return prev;
        if (typeof curr === 'object')
          return Object.values(curr).reduce((p, c) => (c ? !!p : false), true);
        return false;
      }, true);

      let errorResult = false;
      if (error !== null && error !== false) {
        errorResult = Object.values(error).reduce(
          (prev, curr) => !!curr || prev,
          false,
        );
      }
      setEnable(result && !errorResult);
    } else {
      setEnable(false);
    }
  }, [data, error, idChecked]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      gap={1}
      className={classes.root}
    >
      {!saved && (
        <SignUpForm
          {...{
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
            handleRadioChange,
            handleDuplicateCheck,
          }}
        />
      )}
      {saved && (
        <>
          <Typography variant="body1" color="textPrimary">
            회원가입이 완료되었습니다.😉
          </Typography>
          <Typography variant="body2" color="textSecondary">
            메시지는 자동으로 사라집니다.
          </Typography>
        </>
      )}
      {saved === false && (
        <Grid item xs={12}>
          <Typography variant="h6">{error}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default UserSignupContainer;
