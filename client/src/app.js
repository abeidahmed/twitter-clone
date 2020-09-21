import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Context } from 'store';
import { currentUser } from 'api/current-user';
import Regular from 'layouts/regular';
import Slate from 'layouts/slate';

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
    <div className="min-h-screen text-gray-900">
      <Router>
        <Switch>
          <Route path="/secure" component={Slate} />
          <Route path="/" component={Regular} />
        </Switch>
      </Router>
    </div>
  );
}
