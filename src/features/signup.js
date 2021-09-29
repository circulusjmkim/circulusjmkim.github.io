/* eslint-disable no-empty-pattern */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { checkUserId, checkUserInfo, userSignUp } from "../api/amapi";
import { validateBirthDate, validateEmail, validateId, validateName, validatePassword, validateTel } from "../core/utils/validate";

const getErrorObj = (prop, msg, error) => {
  let rejectValue;
  if(error && typeof error === 'object') {
    rejectValue = {...error, [prop]: msg};
  } else if (msg) {
    rejectValue = {[prop]: msg};
  } else if (!msg) {
    rejectValue = error;
  }
  return rejectValue;
}

export const checkId = createAsyncThunk(
  'signup/CHECK_ID',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const { signup } = getState();
      const { error } = signup;
      const { result, error: e } = await checkUserId(userId);
      let rejectValue = getErrorObj('userId', '', error);
      if(result) {
        return { idChecked: result, error: rejectValue };
      }

      let msg;
      if(e && 'code' in e && 'desc' in e) {
        msg = `🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`;
      }
      msg = '이미 존재하는 아이디입니다.';
      
      rejectValue = getErrorObj('userId', msg, error);
      return rejectWithValue(rejectValue);
    } catch (error) {
      const rejectValue = getErrorObj('userId', `${JSON.stringify(error)}:😥 아이디 중복 체크 중 오류 발생`, error);
      return rejectWithValue(rejectValue);
    }
  },
);

export const checkInfo = createAsyncThunk(
  'signup/CHECK_INFO',
  async ({name: target, value}, { rejectWithValue, getState }) => {
    try {
      const { signup } = getState();
      const { error, data: {verified} } = signup;
      const { result, error: e } = await checkUserInfo({target, value});
      let rejectValue = getErrorObj(target, '', error);
      if(result) {
        return { verified: {...verified, [target]: result}, error: rejectValue };
      }
      let msg;
      if(e && 'code' in e && 'desc' in e) {
        msg = `🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`;
      }
      msg = `이미 존재하는 ${target} 인증정보 입니다.`;
      
      rejectValue = getErrorObj(target, msg, error);
      return rejectWithValue(rejectValue);
    } catch (error) {
      const rejectValue = getErrorObj(target, `${JSON.stringify(error)}:😥 인증 정보 중복 체크 중 오류 발생`, error);
      return rejectWithValue(rejectValue);
    }
  }
);

export const signUp = createAsyncThunk(
  'signup/SAVE',
  async (_arg, { rejectWithValue, getState }) => {
    try {
      const { signup } = getState();
      const { data } = signup;
      const { result, error } = await userSignUp(data);
      console.log(result);
      if(result) {
        return result;
      }
      if(error && 'code' in error && 'desc' in error) {
        return rejectWithValue(`🙅🏻‍♀️ ${error.desc} 🙅🏻‍♂️`)
      }
      return rejectWithValue(`😥 회원가입 실패`);
    } catch (error) {
      return rejectWithValue(`${JSON.stringify(error)}:😥 회원가입 중 오류 발생`);
    }
  },
);

const initialState = {
  loading: false,
  data: { userId: '', password: '', lastName: '', firstName: '', email: '', tel: '', birthDate: moment().format('YYYY-MM-DD'), verified: {email: false, tel: false}},
  idChecked: false,
  error: null,
  saved: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    initialize: (state) => ({...initialState, menu: state.menu, bUser: state.bUser, data: state.bUser ? {userId: '', userPId: ''}:{robotId: '', robotPId: ''} }),
    setToggle: (state) => ({...state, bUser: !state.bUser, data: !state.bUser ? { userId: '', userPId: ''} : {robotId: '', robotPId: ''}}),
    setParams: (state, action) => ({...state, data: {...state.data, ...action.payload}}),
    setClear: (state, action) => ({...initialState, menu: state.menu, data: action.payload}),
    setError: (state, action) => ({...state, error: action.payload}),
    initChecked: (state) => ({...state, idChecked: !state.idChecked}),
  },
  extraReducers: {
    [checkId.pending.type]: state => ({ ...state, loading: true,}),
    [checkId.fulfilled.type]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
      idChecked: action.payload.idChecked,
    }),
    [checkId.rejected.type]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      idChecked: false,
    }),
    [checkInfo.pending.type]: state => ({ ...state, loading: true,}),
    [checkInfo.fulfilled.type]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
      data: {...state.data, verified: action.payload.verified},
    }),
    [checkInfo.rejected.type]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      idChecked: false,
    }),
    [signUp.pending.type]: state => ({ ...state, loading: true}),
    [signUp.fulfilled.type]: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      saved: action.payload,
    }),
    [signUp.rejected.type]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      saved: false,
    }),
  }
});

const { reducer: signupReducer, actions } = signupSlice;
export const { initialize, setMenu, setParams, setClear, setError, setToggle, initChecked } = actions;

const getValidateResult = ({value, name}) =>
{ 
  switch (name) {
    case 'userId': return validateId(value);
    case 'password': return validatePassword(value);
    case 'lastName': return validateName(value, name);
    case 'firstName': return validateName(value, name);
    case 'email': return validateEmail({value});
    case 'tel': return validateTel({value});
    case 'birthDate': return validateBirthDate(value);
    default: return '';
  }
}

export const textChange = (e) => (dispatch, getState) => {
  const { target: { value, name } } = e;
  const msg = getValidateResult({name, value});
  const { signup } = getState();
  const { error, idChecked } = signup;
  dispatch(setError({...error, [name]: msg}));
  dispatch(setParams({ [name]: value }));
  if(idChecked && name === 'userId') {
    dispatch(initChecked());
  }
}

export const clearClick = (e, bUser) => (dispatch) => {
  const { target: { name: n } } = e;
  let name = bUser ? 'user' : 'robot';
  if(n === 'logical') {
    name += 'Id';
  }
  if(n === 'physical') {
    name += 'PId';
  }
  dispatch(setParams({ [name]: '' }));
}

export default signupReducer;
