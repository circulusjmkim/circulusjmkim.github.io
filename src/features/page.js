import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: -1,
  item: -1,
  home: true,
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    init: () => ({...initialState }),
    setHome: (state, action) => ({ ...state, home: action.payload }),
    setTab: (state, action) => ({ ...state, ...action.payload }),
    setItem: (state, action) => ({...state, item: action.payload }),
  }
});

const { reducer: pageReducer, actions } = pageSlice;
export const { init, setHome, setTab, setItem } = actions;

export default pageReducer;
