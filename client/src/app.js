import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { currentUser } from 'api/current-user';
import Regular from 'layouts/regular';
import Slate from 'layouts/slate';
import { Provider } from 'react-redux';
import { store } from 'store';
import { setCurrentUser } from 'actions/current-user';

export default function App() {
  useEffect(() => {
    async function getCurrentUser() {
      if (store.getState().currentUser.token) {
        const { data } = await currentUser();
        store.dispatch(setCurrentUser(data));
      }
    }

    getCurrentUser();
  }, [store.getState().currentUser.token]);

  return (
    <Provider store={store}>
      <div className="min-h-screen text-gray-900">
        <Router>
          <Switch>
            <Route path="/secure" component={Slate} />
            <Route path="/" component={Regular} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}
