import Cookies from 'js-cookie';
import { SET_CURRENT_USER } from 'actions/types';

const initialState = {
  user: {},
  token: Cookies.get('token'),
};

export function currentUser(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      Cookies.set('token', action.payload.token, { expires: 7 });
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
