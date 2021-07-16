import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findUserList } from "../api/amapi";
import { SEARCH_CONDITIONS } from "../core/utils/consts";

export const findList = createAsyncThunk(
  `find/GET_LIST`,
  async (params, { rejectWithValue }) => {
    try {
      const { limit, skip } = params;
      const { result, list } = await findUserList(params);
      if(result) {
        const { data, total } = list;
        const page = (skip / limit) + 1;
        const obj = { userList: data, total, limit, page };
        if(skip === 0) {
          const totalPage = Math.ceil(total/limit);
          obj.totalPage = totalPage; 
        }
        return obj;
      }
      return rejectWithValue('😥 목록 조회 실패');
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 목록 조회 실패`);
    }
  },
);

const initialState = {
  chipData: [],
  userList: null,
  limit: 0,
  skip: 0,
  total: 0,
  page: 0,
  totalPage: 0,
  radio: 'user',
  searchWord: '',
  searchConditions: [...SEARCH_CONDITIONS],
};

const findSlice = createSlice({
  name: 'find',
  initialState,
  reducers: {
    init: () => ({...initialState }),
    setConditions: (state, {payload: {index, idx, list} }) => {
      state.searchConditions[index].list[idx].list = list;
      ({...state, searchConditions: state.searchConditions});
    },
    setList: (state, action) => ({...state, ...action.payload }),
    setChipData: (state, action) => ({...state, chipData: action.payload}),
    setSearchType: (state, action) => ({ ...state, radio: action.payload}),
  },
  extraReducers: {
    [findList.pending.type]: state => ({ ...state }),
    [findList.fulfilled.type]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [findList.rejected.type]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  }
});

const { reducer: findReducer, actions } = findSlice;
export const { init, setConditions, setList, setChipData, setSearchType } = actions;

export default findReducer;
