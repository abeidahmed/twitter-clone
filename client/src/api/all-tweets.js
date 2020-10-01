import axios from 'axios';
import { header } from 'middleware/header';

export async function allTweets(key) {
  return await axios.get('/tweets', header());
}

export async function allUserMediaTweets(key, { id }) {
  return await axios.get(`/users/${id}/media_tweets`, header());
}

export async function allUserLikedTweets(key, { id }) {
  return await axios.get(`/users/${id}/liked_tweets`, header());
}
