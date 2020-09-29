import axios from 'axios';
import { header } from 'middleware/header';

export async function likedBy(key, { id }) {
  return await axios.get(`/tweets/${id}/likers`, header());
}
