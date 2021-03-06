import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import themeType from './styles/theme';
import Main from './pages/Main';
import Home from './pages/Home';
import Find from './pages/Find';
import Robot from './pages/Robot';
import User from './pages/User';
import Redis from './pages/Redis';
import Notice from './pages/Notice';

const App = () => (
  <ThemeProvider theme={themeType(true)}>
    <BrowserRouter>
      <CssBaseline />
      <Main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/find" component={Find} />
          <Route path="/robot" component={Robot} />
          <Route path="/user" component={User} />
          <Route path="/redis" component={Redis} />
          <Route path="/notice" component={Notice} />
        </Switch>
      </Main>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
