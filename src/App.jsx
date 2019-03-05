// Import modules
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// Import pages (components)
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';

// Create router
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
