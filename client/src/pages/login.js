import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useCurrentUser } from 'store/current-user';
import { loginUser } from 'api/login-user';
import { Icon } from 'components/icon';
import { Input } from 'components/Field';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();
  const { setUser } = useCurrentUser();

  const [mutate, { isLoading }] = useMutation(loginUser, {
    onSuccess({ data }) {
      setUser(data);
      history.push('/');
    },
    throwOnError: true,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await mutate({
        email,
        password,
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <main className="flex justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full sm:max-w-md">
        <LoginHeader />
        <div className="px-10 py-8 mt-8 bg-white shadow sm:rounded-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              id="login-email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              id="login-password"
              label="Password"
              to={{ pathname: '/', title: 'Forgot password?' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-sm font-medium text-red-700">{error}</p>
            )}
            <div>
              <span className="rounded-md shadow-sm">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="block w-full px-3 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </span>
            </div>
          </form>
          <LoginFooter />
        </div>
      </div>
    </main>
  );
}

export default Login;

function LoginHeader() {
  return (
    <div className="px-4">
      <Icon
        icon="twitter-solid"
        stroke="none"
        fill="currentColor"
        className="w-12 h-12 mx-auto text-blue-500"
      />
      <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
        Sign in to your account
      </h2>
    </div>
  );
}

function LoginFooter() {
  return (
    <>
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          By signing in you agree to our{' '}
          <Link
            to="/"
            className="font-medium underline transition duration-150 ease-in-out hover:text-gray-500"
          >
            terms and conditions
          </Link>
          .
        </p>
      </div>
      <div className="py-5">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div>
        <h3 className="text-gray-700">New to our platform?</h3>
        <div className="mt-4">
          <span className="rounded-md shadow-sm">
            <Link
              to="/secure/signup"
              className="block w-full px-3 py-2 text-base font-medium leading-6 text-center text-gray-700 whitespace-no-wrap transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50"
            >
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
