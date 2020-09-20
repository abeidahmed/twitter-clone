import axios from 'axios';

export async function loginUser({ email, password }) {
  return await axios.post(
    '/sessions',
    {
      user: {
        email,
        password,
      },
    },
    { withCredentials: true }
  );
}
