import { combineReducers } from 'redux';
import robotReducer from '../features/robot';
import findReducer from '../features/find';
import pageReducer from '../features/page';
import noticeReducer from '../features/notice';

export default combineReducers({
  page: pageReducer,
  find: findReducer,
  robot: robotReducer,
  notice: noticeReducer,
});
