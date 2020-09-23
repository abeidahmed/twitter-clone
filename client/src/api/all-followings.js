import axios from 'axios';
import { header } from 'middleware/header';

export async function allFollowings(key, { id }) {
  return await axios.get(`/users/${id}/following`, header());
}
