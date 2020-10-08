import axios from 'axios';
import { header } from 'middleware/header';

export async function bookmarkTweet({ tweetID }) {
  return await axios.post(`/tweets/${tweetID}/bookmarks`, null, header());
}

export async function bookmarkComment({ commentID }) {
  return await axios.post(`/comments/${commentID}/bookmarks`, null, header());
}

export async function bookmarkRetweet({ retweetID }) {
  return await axios.post(`/retweets/${retweetID}/bookmarks`, null, header());
}
