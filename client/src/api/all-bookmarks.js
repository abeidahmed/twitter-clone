import axios from 'axios';
import { header } from 'middleware/header';

export async function allBookmarks(key, { user_id }) {
  return await axios.get(`/users/${user_id}/bookmarks`, header());
}
