/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { disconnectRobotBySerial, findRobot } from "../api/amapi";
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

export const disconnectRobot = createAsyncThunk(
  'robot/DICONNECT',
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

const initialState = {
  robotData: [],
  findError: '',
  disconnResult: null,
  disconnError: '',
};

const robotSlice = createSlice({
  name: 'robot',
  initialState,
  reducers: {
    disconnectInitial: () => ({...initialState }),
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
  }
});

const { reducer: robotReducer, actions } = robotSlice;
export const { disconnectInitial } = actions;

export default robotReducer;
