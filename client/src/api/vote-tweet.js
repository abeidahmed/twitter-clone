import axios from 'axios';
import { header } from 'middleware/header';

export async function voteTweet({ id }) {
  return await axios.post(`/tweets/${id}/vote`, header());
}
