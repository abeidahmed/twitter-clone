import Cookies from 'js-cookie';
import { SET_CURRENT_USER, LOGOUT } from 'actions/types';

const initialState = {
  user: {},
  token: Cookies.get('token'),
};

export function currentUser(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      Cookies.set('token', action.payload.token, { expires: 7 });
      Cookies.set('loggedIn', JSON.stringify(true));
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      Cookies.remove('token');
      Cookies.remove('loggedIn');
      return {
        user: {},
        token: null,
      };
    default:
      return state;
  }
}
