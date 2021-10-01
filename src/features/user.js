import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearUserData, findUserForRobotConnect, deleteAndBAKWithdrawUser, updateUserPassword, updateUserVerifiedInfo } from "../api/amapi";
import { USER_MENU_BAK, USER_MENU_CLEAR, USER_MENU_PASSWORD, USER_MENU_SIGNUP, USER_MENU_VERIFY } from "../core/utils/consts";

export const getUser = createAsyncThunk(
  `user/GET_USER`,
  async ({ userId, use }, { rejectWithValue }) => {
    try {
      const params = use !== undefined ? {userId, use} : {userId}
      const { result, data } = await findUserForRobotConnect(params);
      if(result) {
        return data;
      }
      return rejectWithValue('😥 목록 조회 실패');
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 사용자 조회 실패`);
    }
  }
);

export const clearUser = createAsyncThunk(
  'user/CLEAR',
  async (userId, { rejectWithValue }) => {
    try {
      const { result, error } = await clearUserData({ userId });
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

export const deletedBAKUser = createAsyncThunk(
  'user/DELETE_BAK',
  async ({id, role}, { rejectWithValue }) => {
    try {
      const { result, error } = await deleteAndBAKWithdrawUser({ userId: id, role });
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

export const updatePassword = createAsyncThunk(
  'user/UPDATE_PASSWORD',
  async ({ userId, pw: newPw }, {rejectWithValue}) => {
    try {
      const { result, error } = await updateUserPassword({ userId, newPw });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 비밀번호 변경 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 비밀번호 변경 실패`);
    }
  }
);
export const updateVerifiedInfo = createAsyncThunk(
  'user/UPDATE_VERIFIED_INFO',
  async ({ userId, tel, email }, {rejectWithValue}) => {
    try {
      const { result, error } = await updateUserVerifiedInfo({ userId, tel, email });
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 인증정보 변경 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 인증정보 변경 실패`);
    }
  }
);

const initialState = {
  menu: USER_MENU_PASSWORD,
  data: [],
  dataError: '',
  result: null,
  error: '',
  params: {},
};

const userSlice = createSlice({
  name: 'user',
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
    [clearUser.pending.type]: state => ({ ...state, result: null, error: ''}),
    [clearUser.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [clearUser.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    [updatePassword.pending.type]: state => ({ ...state, result: null, error: ''}),
    [updatePassword.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [updatePassword.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    [updateVerifiedInfo.pending.type]: state => ({ ...state, result: null, error: ''}),
    [updateVerifiedInfo.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [updateVerifiedInfo.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    [deletedBAKUser.pending.type]: state => ({ ...state, result: null, error: ''}),
    [deletedBAKUser.fulfilled.type]: (state, action) => ({
      ...state,
      error: '',
      result: action.payload,
    }),
    [deletedBAKUser.rejected.type]: (state, action) => ({
      ...state,
      result: false,
      error: action.payload,
    }),
    // [transfertData.pending.type]: state => ({ ...state, result: null, error: ''}),
    // [transfertData.fulfilled.type]: (state, action) => ({
    //   ...state,
    //   error: '',
    //   result: action.payload,
    // }),
    // [transfertData.rejected.type]: (state, action) => ({
    //   ...state,
    //   result: false,
    //   error: action.payload,
    // }),
  }
});

const { reducer: userReducer, actions } = userSlice;
export const { initialize, setMenu, setParams, setClear, setError } = actions;

export const findClick = () => (dispatch, getState)=> {
  const { user } = getState();
  const { menu, params } = user;
  if(menu === USER_MENU_PASSWORD || menu === USER_MENU_CLEAR || menu === USER_MENU_VERIFY) {
    const { words } = params;
    dispatch(getUser({ userId: words }));
  }
  if(menu === USER_MENU_BAK) {
    const { words } = params;
    dispatch(getUser({ userId: words, use: false }));
  }
 }

export const textChange = (e) => (dispatch, getState) => {
  const { user } = getState();
  const { menu } = user;
  const { target: { value: v} } = e;
  const value = v.replace(/[^a-zA-Z\d]/g, '');
  console.log(v, menu);
  if(menu !== USER_MENU_SIGNUP) {
    dispatch(setParams({ words: value }));
  }
}

export const clearClick = () => (dispatch, getState) => {
  const { user } = getState();
  const { menu } = user;

  if(menu !== USER_MENU_SIGNUP) {
    dispatch(setClear({ words: '' }));
  }
}

export default userReducer;
