import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';

export const App = () => (
  <Router>
    <div id="app">
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);

export default App;
