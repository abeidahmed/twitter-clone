import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Cookies.get('loggedIn')) {
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
