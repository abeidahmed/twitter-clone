import { SET_CURRENT_USER } from './types';

export function setCurrentUser(payload) {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
}
