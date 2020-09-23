import axios from 'axios';
import { header } from 'middleware/header';

export async function unfollow({ id }) {
  return axios.delete(`/relationships/${id}`, header());
}
