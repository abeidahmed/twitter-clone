import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from 'containers/LoginPage';
import Signup from 'containers/SignupPage';

export default function Slate() {
  return (
    <Switch>
      <Route path="/secure/signup" component={Signup} />
      <Route path="/secure/login" component={Login} />
    </Switch>
  );
}
