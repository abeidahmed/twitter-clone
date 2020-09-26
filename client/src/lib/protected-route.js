import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { currentUser } from 'api/current-user';
import { TOKEN } from 'store/current-user';
import { Spinner } from 'components/spinner';

function ProtectedRoute({ component: Component, ...rest }) {
  const { data, isLoading, isError } = useQuery(
    'fetchCurrentUser',
    currentUser
  );

  if (!Cookies.get(TOKEN) || isError) window.location.href = '/secure/login';

  if (isLoading) return <Spinner />;

  const token = data.data.token;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
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
