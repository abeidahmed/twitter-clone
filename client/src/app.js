import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import ProtectedRoute from 'lib/protected-route';
import Regular from 'layouts/regular';
import Slate from 'layouts/slate';
import { setCurrentUser } from 'actions/current-user';
import { currentUser } from 'api/current-user';

export default function App() {
  const token = store.getState().currentUser.token;

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        const { data } = await currentUser();
        store.dispatch(setCurrentUser(data));
      }
    }

    getCurrentUser();
  }, [token]);

  return (
    <Provider store={store}>
      <div className="min-h-screen text-gray-900">
        <Router>
          <Switch>
            <Route path="/secure" component={Slate} />
            <ProtectedRoute path="/" component={Regular} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}
