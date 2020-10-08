import axios from 'axios';
import { header } from 'middleware/header';

export async function voteRetweet({ id }) {
  return await axios.post(`/retweets/${id}/vote`, null, header());
}
