import axios from 'axios';
import { header } from 'middleware/header';

export async function voteComment({ id }) {
  return await axios.post(`/comments/${id}/vote`, null, header());
}
