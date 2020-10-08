import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from 'components/ProtectedRoute';
import Regular from 'layouts/regular';
import Slate from 'layouts/slate';
import { currentUser } from 'api/current-user';
import { useCurrentUser } from 'store/currentUser';

export default function App() {
  const { setUser, token } = useCurrentUser();

  /* eslint-disable */
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        const { data } = await currentUser();
        setUser(data);
      }
    }

    getCurrentUser();
  }, [token]);
  /* eslint-enable */
  return (
    <div className="min-h-screen text-gray-900 bg-white">
      <Router>
        <Switch>
          <Route path="/secure" component={Slate} />
          <ProtectedRoute path="/" component={Regular} />
        </Switch>
      </Router>
    </div>
  );
}
