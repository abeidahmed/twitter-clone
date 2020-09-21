import axios from 'axios';
import { header } from 'middleware/header';

export async function currentUser() {
  return await axios.get('/sessions/current_user', header());
}
