import axios from 'axios';
import qs from 'query-string';
import { header } from 'middleware/header';

export async function allUsers(key, { q }) {
  const url = qs.stringifyUrl(
    {
      url: '/users',
      query: {
        q,
      },
    },
    { skipEmptyString: true }
  );

  return await axios.get(url, header());
}
