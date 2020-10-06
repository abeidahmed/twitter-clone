import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useCurrentUser } from 'store/current-user';
import { loginUser } from 'api/login-user';
import { Input } from 'components/Field';
import Footer from './Footer';
import Header from './Header';

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
        <Header />
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
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default Login;
