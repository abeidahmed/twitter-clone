import axios from 'axios';
import { header } from 'middleware/header';

export async function updateUser({
  id,
  name,
  bio,
  location,
  website,
  avatar,
  banner,
}) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('bio', bio);
  formData.append('location', location);
  formData.append('website', website);
  formData.append('avatar', avatar);
  formData.append('banner', banner);

  return await axios.patch(`/users/${id}`, formData, header());
}
