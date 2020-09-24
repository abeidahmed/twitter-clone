import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LOGGED_IN } from 'store/current-user';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Cookies.get(LOGGED_IN)) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/secure/login',
            }}
          />
        );
      }}
    />
  );
}

export default ProtectedRoute;
