import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { addNotice, getNotice } from "../api/amapi";

export const add = createAsyncThunk(
  'notice/ADD',
  async ({ title, content, emoji, order, fixed, date }, { rejectWithValue }) => {
    try {
      const { result, error } = await addNotice({ title, content, emoji, order, fixed, date });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 공지사항 등록 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 공지사항 등록 실패`);
    }
  },
);

export const getList = createAsyncThunk(
  'notice/GET_LIST',
  async ({ skip, limit }, { rejectWithValue }) => {
    try {
      const { result, data, error } = await getNotice({ skip, limit });
      if(result) {
        const list = data.map(({ order, firstTime, lastTime, fixed:f, ...rest }) => {
          const note = order === 1;
          console.log(firstTime, lastTime);
          const createdAt = moment(firstTime).format('lll');
          const updatedAt = moment(lastTime).format('lll');
          const fixed = f || false;
          return { ...rest, note, fixed, createdAt, updatedAt };
        })
        return {skip, limit, list};
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 공지사항 로드 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 공지사항 로드 실패`);
    }
  },
);


const initialState = {
  error: null,
  saved: null,
  list: [],
  skip: 0,
  limit: 10,
}

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    init: () => ({...initialState }),
  },
  extraReducers: {
    [add.pending.type]: state => ({ ...state, error: null, saved: null}),
    [add.fulfilled.type]: (state, action) => ({
      ...state,
      error: null,
      saved: action.payload,
    }),
    [add.rejected.type]: (state, action) => ({
      ...state,
      saved: false,
      error: action.payload,
    }),
    [getList.pending.type]: state => ({ ...state, error: null }),
    [getList.fulfilled.type]: (state, action) => ({
      ...state,
      error: null,
      skip: action.payload.skip,
      limit: action.payload.limit,
      list: action.payload.list,
    }),
    [getList.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  }
});

const { reducer: noticeReducer, actions } = noticeSlice;
export const { init } = actions;

export default noticeReducer;
