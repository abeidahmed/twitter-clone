import axios from 'axios';
import { header } from 'middleware/header';

export async function showTweet(key, { uuid }) {
  return await axios.get(`/tweets/${uuid}`, header());
}
