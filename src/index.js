import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import FetchInterceptor from 'fetch-interceptor';
import axios from 'axios';
import reducer from './store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { getRobotId, getUserPId } from './core/utils/common';


const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const startApp = () => {
  FetchInterceptor.register({
    onBeforeRequest(request) {
      request.headers.append('Access-Control-Allow-Origin', '*');
      request.headers.append(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      request.headers.append(
        'Access-Control-Allow-Headers',
        'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, x-client-type, x-client-id',
      );
      request.headers.append('Access-Control-Max-Age', 3600);
      if (getRobotId()) {
        request.headers.append(
          'x-client-type',
          '08f12867e7a16b1b9071ae92ca8b6e7e1698068f',
        );
        request.headers.append('x-client-id', getRobotId());
      } else if (getUserPId()) {
        request.headers.append(
          'x-client-type',
          '70ff9f33926b1865edde645073a37bd1fffba984',
        );
        request.headers.append('x-client-id', getUserPId());
      } else {
        request.headers.append(
          'x-client-type',
          '70ff9f33926b1865edde645073a37bd1fffba984',
        );
        request.headers.append('x-client-id', '5d9031b06ad9bf03c0045ac4');
      }
    },
  });
  axios.interceptors.request.use(
    (config) => {
      const reqConfig = config;
      const {
        headers: { common },
      } = reqConfig;
      if (getRobotId()) {
        common['x-client-type'] = '08f12867e7a16b1b9071ae92ca8b6e7e1698068f';
        common['x-client-id'] = getRobotId();
      } else if (getUserPId()) {
        common['x-client-type'] = '70ff9f33926b1865edde645073a37bd1fffba984';
        common['x-client-id'] = getUserPId();
      }
      return reqConfig;
    },
    (error) => Promise.reject(error),
  );
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};
startApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
