import axios from 'axios';
import { header } from 'middleware/header';

export async function showUser(key, { id }) {
  return await axios.get(`/users/${id}`, header());
}
