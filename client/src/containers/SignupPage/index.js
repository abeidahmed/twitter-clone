import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from 'store/current-user';
import { signupUser } from 'api/signup-user';
import { Input } from 'components/Field';
import Header from './Header';
import Terms from './Terms';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);

  const history = useHistory();
  const { setUser } = useCurrentUser();

  const [mutate, { isLoading }] = useMutation(signupUser, {
    onSuccess({ data }) {
      setUser(data);
      history.push('/');
    },
    throwOnError: true,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError([]);
    try {
      await mutate({
        email,
        username,
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
              label="Email address"
              id="signup-email"
              type="email"
              error={error}
              errorType="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Twitter handle"
              id="signup-username"
              type="text"
              error={error}
              errorType="twitter handle"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              id="signup-password"
              type="password"
              error={error}
              errorType="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <span className="rounded-md shadow-sm">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="block w-full px-3 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                >
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </button>
              </span>
            </div>
          </form>
          <Terms />
        </div>
      </div>
    </main>
  );
}

export default Signup;
