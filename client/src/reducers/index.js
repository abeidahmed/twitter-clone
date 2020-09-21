import Cookies from 'js-cookie';

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      Cookies.set('token', action.payload.token, { expires: 7 });
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
