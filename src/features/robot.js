/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { disconnectRobotBySerial, transferRobotData, findRobot, clearRobotData } from "../api/amapi";
// import { findRobot } from "../api/amapi";

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
  robotData: [],
  findError: '',
  clearResult: null,
  clearError: '',
  disconnResult: null,
  disconnError: '',
  transferResult: null,
  transferError: '',
};

const robotSlice = createSlice({
  name: 'robot',
  initialState,
  reducers: {
    robotInitialize: () => ({...initialState }),
  },
  extraReducers: {
    [getRobot.pending.type]: state => ({ ...state, findError: ''}),
    [getRobot.fulfilled.type]: (state, action) => ({
      ...state,
      findError: '',
      robotData: action.payload,
    }),
    [getRobot.rejected.type]: (state, action) => ({
      ...state,
      findError: action.payload,
    }),
    [disconnectRobot.pending.type]: state => ({ ...state, disconnResult: null, disconnError: ''}),
    [disconnectRobot.fulfilled.type]: (state, action) => ({
      ...state,
      disconnError: '',
      disconnResult: action.payload,
    }),
    [disconnectRobot.rejected.type]: (state, action) => ({
      ...state,
      disconnResult: false,
      disconnError: action.payload,
    }),
    [clearRobot.pending.type]: state => ({ ...state, clearResult: null, clearError: ''}),
    [clearRobot.fulfilled.type]: (state, action) => ({
      ...state,
      clearError: '',
      clearResult: action.payload,
    }),
    [clearRobot.rejected.type]: (state, action) => ({
      ...state,
      clearResult: false,
      clearError: action.payload,
    }),
    [transfertData.pending.type]: state => ({ ...state, transferResult: null, transferError: ''}),
    [transfertData.fulfilled.type]: (state, action) => ({
      ...state,
      transferError: '',
      transferResult: action.payload,
    }),
    [transfertData.rejected.type]: (state, action) => ({
      ...state,
      transferResult: false,
      transferError: action.payload,
    }),
  }
});

const { reducer: robotReducer, actions } = robotSlice;
export const { robotInitialize } = actions;

export default robotReducer;
