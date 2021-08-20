import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { addNotice, deleteNotice, getNoticeItem, getNoticeList, updateNotice } from "../api/amapi";

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

export const updateItem = createAsyncThunk(
  'notice/UPDATE',
  async ({ id, title, content, emoji, order, fixed, date }, { rejectWithValue }) => {
    try {
      const { result, error } = await updateNotice({ id, title, content, emoji, order, fixed, date });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 공지사항 수정 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 공지사항 수정 실패`);
    }
  },
);

export const deleteItem = createAsyncThunk(
  'notice/DELETE',
  async ({ id, strict }, { rejectWithValue }) => {
    try {
      console.log('notice/DELETE', id, strict);
      const { result, error } = await deleteNotice({ id, strict });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 공지사항 삭제 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 공지사항 삭제 실패`);
    }
  },
);

export const getItem = createAsyncThunk(
  `notice/GET_ITEM`,
  async (id, { rejectWithValue }) => {
    try {
      const { result, data } = await getNoticeItem(id);
      if(result) {
        return data;
      }
      return rejectWithValue(`😥 공지사항(${id}) 로드 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 공지사항(${id}) 로드 실패`);
    }
  }
);

export const getList = createAsyncThunk(
  'notice/GET_LIST',
  async ({ skip, limit, handleEdit, handleDelete }, { rejectWithValue }) => {
    try {
      const { result, data, error } = await getNoticeList({ skip, limit });
      if(result) {
        const list = data.map(({ title: t, order, firstTime, lastTime, fixed:f, ...rest }) => {
          const title = { title: t, handleEdit };
          const createdAt = moment(firstTime).format('YYYY.MM.DD hh:mm:ss');
          const updatedAt = moment(lastTime).format('YYYY.MM.DD hh:mm:ss');
          const fixed = f ? `🆙` : '';
          const note = order === 1 ? `🔒` : '';
          const editBtn = handleEdit;
          const deleteBtn = handleDelete;
          return { ...rest, title, note, fixed, createdAt, updatedAt, editBtn, deleteBtn };
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
  editMode: false,
  editItem: null,
  deleted: false,
}

const noticeSlice = createSlice({
  name: 'notice',
  initialState,
  reducers: {
    init: () => ({...initialState }),
    getUpdate: (state, action) => ({ ...state, editMode: action.payload.mode, editItem: action.payload.item }),
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
    [updateItem.pending.type]: state => ({ ...state, error: null, saved: null}),
    [updateItem.fulfilled.type]: (state, action) => ({
      ...state,
      error: null,
      saved: action.payload,
    }),
    [updateItem.rejected.type]: (state, action) => ({
      ...state,
      saved: false,
      error: action.payload,
    }),
    [deleteItem.pending.type]: state => ({ ...state, error: null, deleted: null}),
    [deleteItem.fulfilled.type]: (state, action) => ({
      ...state,
      error: null,
      deleted: action.payload,
    }),
    [deleteItem.rejected.type]: (state, action) => ({
      ...state,
      deleted: false,
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
    [getItem.pending.type]: state => ({ ...state, error: null }),
    [getItem.fulfilled.type]: (state, action) => ({
      ...state,
      error: null,
      editMode: true,
      editItem: action.payload,
    }),
    [getItem.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  }
});

const { reducer: noticeReducer, actions } = noticeSlice;
const { getUpdate } = actions;
export const { init } = actions;

export const setEditMode = ({ mode, item: selectId }) => (dispatch) => {
  // const { notice } = getState();
  if(mode) {
    dispatch(getItem(selectId));
  } else {
    dispatch(getUpdate({ mode, item: null}));
  }
};

export default noticeReducer;
