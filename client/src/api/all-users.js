import axios from 'axios';
import { header } from 'middleware/header';

export async function allUsers() {
  return await axios.get('/users', header());
}
