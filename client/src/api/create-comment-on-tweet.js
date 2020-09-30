import axios from 'axios';
import { header } from 'middleware/header';

export async function createCommentOnTweet({ content, tweetId }) {
  return await axios.post(
    `/tweets/${tweetId}/comments`,
    {
      comment: {
        content,
      },
    },
    header()
  );
}
