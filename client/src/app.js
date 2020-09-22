import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import Regular from 'layouts/regular';
import Slate from 'layouts/slate';
import { setCurrentUser } from 'actions/current-user';
import { currentUser } from 'api/current-user';

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
