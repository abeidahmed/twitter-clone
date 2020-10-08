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

export async function createRetweetRetweet({ retweetID, body }) {
  return await axios.post(
    `/retweets/${retweetID}/retweets`,
    {
      retweet: {
        body,
      },
    },
    header()
  );
}
