import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Store from 'store';
import Home from 'pages/index';
import Signup from 'pages/signup';
import Login from 'pages/login';

export default function App() {
  return (
    <Store>
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Store>
  );
}
