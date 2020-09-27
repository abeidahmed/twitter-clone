import axios from 'axios';
import { header } from 'header';

export async function createTweet({ body, image, replyStatus }) {
  const formData = new FormData();
  formData.append('body', body);
  formData.append('image', image);
  formData.append('reply_status', replyStatus);

  return await axios.post('/tweets', formData, header());
}
