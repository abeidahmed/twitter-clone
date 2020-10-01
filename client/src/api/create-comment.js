import axios from 'axios';
import { header } from 'middleware/header';

export async function createCommentOnTweet({ content, tweetID }) {
  return await axios.post(
    `/tweets/${tweetID}/comments`,
    {
      comment: {
        content,
      },
    },
    header()
  );
}

export async function createCommentonComment({ content, commentID }) {
  return await axios.post(
    `/comments/${commentID}/comments`,
    {
      comment: {
        content,
      },
    },
    header()
  );
}
