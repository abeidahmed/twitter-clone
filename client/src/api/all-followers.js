import axios from 'axios';
import { header } from 'middleware/header';

export async function allFollowers(key, { id }) {
  return await axios.get(`/users/${id}/followers`, header());
}
