import axios from 'axios';
import qs from 'query-string';
import { header } from 'middleware/header';

export async function allTweets(key) {
  return await axios.get('/tweets', header());
}

export async function allUserTweets(key, { id, filter = '' }) {
  const url = qs.stringifyUrl(
    {
      url: `/users/${id}/tweets`,
      query: {
        filter,
      },
    },
    { skipEmptyString: true }
  );

  return await axios.get(url, header());
}

export async function allUserLikedTweets(key, { id }) {
  return await axios.get(`/users/${id}/liked_tweets`, header());
}
