import axios from 'axios';

export async function signupUser({ email, username, password }) {
  return await axios.post(
    '/users',
    {
      user: {
        email,
        twitter_handle: username,
        password,
      },
    },
    { withCredentials: true }
  );
}
