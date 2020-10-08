import axios from 'axios';
import { header } from 'middleware/header';

export async function createTweetRetweet({ tweetID, body }) {
  return await axios.post(
    `/tweets/${tweetID}/retweets`,
    {
      retweet: {
        body,
      },
    },
    header()
  );
}