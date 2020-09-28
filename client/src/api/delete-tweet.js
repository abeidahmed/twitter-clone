import axios from 'axios';
import { header } from 'middleware/header';

export async function deleteTweet({ id }) {
  return await axios.delete(`/tweets/${id}`, header());
}
