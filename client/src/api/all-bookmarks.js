import axios from 'axios';
import { header } from 'middleware/header';

export async function allBookmarks(key) {
  return await axios.get('/bookmarks', header());
}
