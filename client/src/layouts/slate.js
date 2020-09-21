import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from 'pages/login';
import Signup from 'pages/signup';

export default function Slate() {
  return (
    <Switch>
      <Route path="/secure/signup" component={Signup} />
      <Route path="/secure/login" component={Login} />
    </Switch>
  );
}
