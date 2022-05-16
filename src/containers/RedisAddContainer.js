import React, { useEffect } from 'react';
import { useToggle, useUpdateEffect } from 'react-use';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../styles/redisStyle';
import {
  addRedis,
  clearClick,
  initialize,
  setToggle,
  textChange,
} from '../features/redis';
import RedisForm from '../components/RedisForm';

const RedisAddContainer = () => {
  // `모드 선택 => 로봇/사용자 토글 선택 => userId, userObjectId, robotId, robotObjectId 입력 => 추가`
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bUser, params, result, error } = useSelector((state) => state.redis);
  const [enabled, setEnabeld] = useToggle(false);

  useEffect(() => {
    const value = Object.entries(params).reduce((prev, curr) => {
      const [k, v] = curr;
      if (k.indexOf('user') === 0) {
        return prev && v.length >= 4;
      }
      return prev && v.length >= 8;
    }, true);
    setEnabeld(value);
  }, [params]);

  const handleChange = () => {
    dispatch(setToggle());
  };

  const handleTextChange = (e) => {
    dispatch(textChange(e, bUser));
  };

  const handleClickClear = (e) => {
    dispatch(clearClick(e, bUser));
  };

  const handleButtonClick = () => {
    dispatch(addRedis());
  };

  useUpdateEffect(() => {
    if (result) {
      setTimeout(() => {
        dispatch(initialize());
      }, 2000);
    }
  }, [result]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      className={classes.root}
    >
      {!result && (
        <RedisForm
          {...{
            classes,
            enabled,
            bUser,
            params,
            error,
            handleButtonClick,
            handleChange,
            handleTextChange,
            handleClickClear,
          }}
        />
      )}
      {result && (
        <>
          <Typography variant="body1" color="textPrimary">{`${
            bUser ? '사용자' : '로봇'
          }의 정보가 redis에 등록되었습니다.😉`}</Typography>
          <Typography variant="body2" color="textSecondary">
            메시지는 자동으로 사라집니다.
          </Typography>
        </>
      )}
      {error && (
        <Grid item xs={12}>
          <Typography variant="h6">{error}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default RedisAddContainer;
