import axios from 'axios';
import { header } from 'middleware/header';

export async function allRetweets(key) {
  return await axios.get('/retweets', header());
}
