import axios from 'axios';
import { header } from 'middleware/header';

export async function follow({ id }) {
  return axios.post(
    '/relationships',
    {
      id,
    },
    header()
  );
}
