import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Context } from 'store';
import { currentUser } from 'api/current-user';
import Home from 'pages/index';
import Signup from 'pages/signup';
import Login from 'pages/login';

export default function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    async function getCurrentUser() {
      if (state.token) {
        const { data } = await currentUser();
        dispatch({
          type: 'SET_USER',
          payload: data,
        });
      }
    }
    getCurrentUser();
  }, [state.token]);

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
