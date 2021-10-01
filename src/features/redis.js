/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerRedis, unregisterRedis } from "../api/amapi";
import { REDIS_MENU_ADD } from "../core/utils/consts";

export const addRedis = createAsyncThunk(
  'redis/ADD',
  async (_arg, { rejectWithValue, getState }) => {
    try {
      const { redis } = getState();
      const { params } = redis;
      const { result, error } = await registerRedis(params);
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 해당 redis 정보 등록 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 해당 redis 정보 등록 실패`);
    }
  },
);

export const removeRedis = createAsyncThunk(
  'redis/REMOVE',
  async (_arg, { rejectWithValue, getState }) => {
    try {
      const { redis } = getState();
      const { params } = redis;
      const { result, error } = await unregisterRedis(params);
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 해당 redis 정보 삭제 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 해당 redis 정보 삭제 실패`);
    }
  },
);

const initialState = {
  menu: REDIS_MENU_ADD,
  bUser: false,
  result: null,
  error: '',
  params: { robotId: '' },
};

const redisSlice = createSlice({
  name: 'redis',
  initialState,
  reducers: {
    initialize: (state) => ({...initialState, menu: state.menu, bUser: state.bUser, params: state.bUser ? {userId: ''}:{robotId: ''} }),
    setToggle: (state) => ({...state, bUser: !state.bUser, params: !state.bUser ? { userId: ''} : {robotId: ''}}),
    setParams: (state, action) => ({...state, error: '', params: {...state.params, ...action.payload}}),
    setClear: (state, action) => ({...initialState, menu: state.menu, params: action.payload}),
    setError: (state, action) => ({...state, error: action.payload}),
  },
  extraReducers: {
    [addRedis.pending.type]: state => ({ ...state, result: null, error: ''}),
    [addRedis.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [addRedis.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    [removeRedis.pending.type]: state => ({ ...state, result: null, error: ''}),
    [removeRedis.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [removeRedis.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
  }
});

const { reducer: redisReducer, actions } = redisSlice;
export const { initialize, setMenu, setParams, setClear, setError, setToggle } = actions;

export const textChange = (e, bUser) => (dispatch) => {
  const { target: { value: v, name: n } } = e;
  const value = v.replace(/[^a-zA-Z\d]/g, '').toLowerCase();
  
  let name = bUser ? 'user' : 'robot';
  if(n === 'logical') {
    name += 'Id';
  }
  // if(n === 'physical') {
  //   name += 'PId';
  // }

  dispatch(setParams({ [name]: value }));
}

export const clearClick = (e, bUser) => (dispatch) => {
  const { target: { name: n } } = e;
  let name = bUser ? 'user' : 'robot';
  if(n === 'logical') {
    name += 'Id';
  }
  // if(n === 'physical') {
  //   name += 'PId';
  // }
  dispatch(setParams({ [name]: '' }));
}

export default redisReducer;
