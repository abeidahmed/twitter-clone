import axios from 'axios';
import { header } from 'middleware/header';

export async function deleteComment({ id }) {
  return await axios.delete(`/comments/${id}`, header());
}
