import { combineReducers } from 'redux';
import robotReducer from '../features/robot';
import findReducer from '../features/find';
import pageReducer from '../features/page';
import noticeReducer from '../features/notice';
import redisReducer from '../features/redis';
import signupReducer from '../features/signup';
import userReducer from '../features/user';

export default combineReducers({
  page: pageReducer,
  find: findReducer,
  robot: robotReducer,
  notice: noticeReducer,
  redis: redisReducer,
  signup: signupReducer,
  user: userReducer,
});
