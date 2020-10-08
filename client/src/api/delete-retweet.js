import axios from 'axios';
import { header } from 'middleware/header';

export async function deleteRetweet({ id }) {
  return await axios.delete(`/retweets/${id}`, header());
}
