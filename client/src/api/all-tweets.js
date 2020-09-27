import axios from 'axios';
import { header } from 'middleware/header';

export async function allTweets(key) {
  return await axios.get('/tweets', header());
}
