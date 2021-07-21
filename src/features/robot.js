/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { disconnectRobotBySerial, transferRobotData, findRobot, clearRobotData, connectRobotBySerial, findUserForRobotConnect } from "../api/amapi";
import { ROBOT_MENU_CLEAR, ROBOT_MENU_CONNECT, ROBOT_MENU_DISCONNECT, ROBOT_MENU_TRANSFER } from "../core/utils/consts";

export const getRobot = createAsyncThunk(
  `robot/GET_ROBOT`,
  async (params, { rejectWithValue }) => {
    let bObjectId = false;
    let bSerial = false;
    if(params.length === 24 && /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(params)) {
      bObjectId = true;
    }
    if(params.length === 16 && /^10000000{1}(\d+[a-f]|[a-f]+\d{8})/i.test(params)) {
      
      bSerial = true;
    }
    if(!bSerial && params.length === 8 && /^(?!0)[\w\d]{8}$/i.test(params)) {
      bSerial = true;
    }

    if(!(bObjectId || bSerial)) {
      return rejectWithValue('유효하지 않은 ObjectId 또는 Serial No.입니다.');
    }
    try {
      const { result, data, error } = await findRobot({robot: params});
      if(result) {
        return data;
      }
      if(error && 'code' in error && error.code === '4a104b') {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`);
      }
      return rejectWithValue('😥 목록 조회 실패');
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 목록 조회 실패`);
    }
  },
);

export const getUser = createAsyncThunk(
  `robot/GET_USER`,
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { result, data } = await findUserForRobotConnect({ userId });
      if(result) {
        return data;
      }
      return rejectWithValue('😥 목록 조회 실패');
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 사용자 조회 실패`);
    }
  }
);

export const clearRobot = createAsyncThunk(
  'robot/CLEAR',
  async (serial, { rejectWithValue }) => {
    try {
      const { result, error } = await clearRobotData({ serial });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 데이터 클리어 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 데이터 클리어 실패`);
    }
  },
);

export const connectRobot = createAsyncThunk(
  'robot/CONNECT',
  async ({ userId, serial }, { rejectWithValue }) => {
    try {
      const { result, error } = await connectRobotBySerial({ userId, serial });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 연결 해제 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 연결 해제 실패`);
    }
  },
);

export const disconnectRobot = createAsyncThunk(
  'robot/DISCONNECT',
  async (serial, { rejectWithValue }) => {
    try {
      const { result, error } = await disconnectRobotBySerial({ serial });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 연결 해제 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 연결 해제 실패`);
    }
  },
);

export const transfertData = createAsyncThunk(
  'robot/TRANSFER',
  async ({ userId, serial, newSerial }, { rejectWithValue }) => {
    try {
      const { result, error } = await transferRobotData({ userId, serial, newSerial });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 데이터 이전 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 데이터 이전 실패`);
    }
  }
);

const initialState = {
  menu: ROBOT_MENU_CONNECT,
  data: [],
  dataError: '',
  result: null,
  error: '',
  params: {},
};

const robotSlice = createSlice({
  name: 'robot',
  initialState,
  reducers: {
    initialize: (state) => ({...initialState, menu: state.menu }),
    setMenu: (state, action) => ({...state, menu: action.payload}),
    setParams: (state, action) => ({...state, params: {...state.params, ...action.payload}}),
    setClear: (state, action) => ({...initialState, menu: state.menu, params: action.payload}),
    setError: (state, action) => ({...state, error: action.payload}),
  },
  extraReducers: {
    [getUser.pending.type]: state => ({ ...state, dataError: ''}),
    [getUser.fulfilled.type]: (state, action) => ({
      ...state,
      dataError: '',
      data: action.payload,
    }),
    [getUser.rejected.type]: (state, action) => ({
      ...state,
      dataError: action.payload,
    }),
    [getRobot.pending.type]: state => ({ ...state, dataError: ''}),
    [getRobot.fulfilled.type]: (state, action) => ({
      ...state,
      dataError: '',
      data: action.payload,
    }),
    [getRobot.rejected.type]: (state, action) => ({
      ...state,
      dataError: action.payload,
    }),
    [connectRobot.pending.type]: state => ({ ...state, result: null, error: ''}),
    [connectRobot.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [connectRobot.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    [disconnectRobot.pending.type]: state => ({ ...state, result: null, error: ''}),
    [disconnectRobot.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [disconnectRobot.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    [clearRobot.pending.type]: state => ({ ...state, result: null, error: ''}),
    [clearRobot.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [clearRobot.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    [transfertData.pending.type]: state => ({ ...state, result: null, error: ''}),
    [transfertData.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [transfertData.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
  }
});

const { reducer: robotReducer, actions } = robotSlice;
export const { initialize, setMenu, setParams, setClear, setError } = actions;

export const findClick = () => (dispatch, getState)=> {
  const { robot } = getState();
  const { menu, params } = robot;
  if(menu === ROBOT_MENU_DISCONNECT || menu === ROBOT_MENU_CLEAR) {
    const { words } = params;
    dispatch(getRobot(words));
  }
  if(menu === ROBOT_MENU_CONNECT) {
    const { userId } = params;
    dispatch(getUser({ userId }));
  }
  if(menu === ROBOT_MENU_TRANSFER) {
    const { beforeSerial } = params;
    dispatch(getRobot(beforeSerial));
  }
}

export const textChange = (e) => (dispatch, getState) => {
  const { robot } = getState();
  const { menu } = robot;
  const { target: { name, value: v} } = e;
  const value = v.replace(/[^a-zA-Z\d]/g, '');

  if(menu === ROBOT_MENU_DISCONNECT || menu === ROBOT_MENU_CLEAR) {
    dispatch(setParams({ words: value }));
  }

  if(menu === ROBOT_MENU_TRANSFER || menu === ROBOT_MENU_CONNECT) {
    dispatch(setParams({ [name]: value }));
  }
}

export const clearClick = (name) => (dispatch, getState) => {
  const { robot } = getState();
  const { menu, params } = robot;

  if(menu === ROBOT_MENU_DISCONNECT || menu === ROBOT_MENU_CLEAR) {
    dispatch(setClear({ words: '' }));
  }

  if(menu === ROBOT_MENU_TRANSFER || menu === ROBOT_MENU_CONNECT) {
    if(name === 'beforeSerial' || name === 'userId') {
      const newParams = Object.keys(params).reduce((prev, curr) => {
        const newPrev = {...prev, [curr]: ''};
        return newPrev;
      }, {});
      dispatch(setClear(newParams));
    } else {
      dispatch(setParams({ [name]: '' }));
      dispatch(setError(''));
    }
  }
}

export default robotReducer;
