import axios from 'axios';
import { header } from 'middleware/header';

export async function deleteBookmark({ id }) {
  return await axios.delete(`/bookmarks/${id}`, header());
}
