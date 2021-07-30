import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNotice } from "../api/amapi";

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


const initialState = {
  error: null,
  saved: null,
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
  }
});

const { reducer: noticeReducer, actions } = noticeSlice;
export const { init } = actions;

export default noticeReducer;
