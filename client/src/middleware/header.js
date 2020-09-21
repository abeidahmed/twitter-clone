import Cookies from 'js-cookie';

export function header() {
  const token = Cookies.get('token');

  const config = {
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  };

  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  return config;
}
