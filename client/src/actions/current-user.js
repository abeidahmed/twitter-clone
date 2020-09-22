import { SET_CURRENT_USER, LOGOUT } from './types';

export function setCurrentUser(payload) {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
