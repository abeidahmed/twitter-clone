import React, { useReducer, createContext, useContext } from 'react';
import Cookies from 'js-cookie';

const TOKEN = 'TWITTER_CLONE_TOKEN';

const actionTypes = {
  setUser: 'SET_USER',
  logout: 'LOGOUT_USER',
};

const initialState = {
  user: {},
  token: Cookies.get(TOKEN),
};

function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setUser:
      Cookies.set(TOKEN, action.payload.token, { expires: 7 });
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case actionTypes.logout:
      Cookies.remove(TOKEN);
      return {
        user: {},
        token: null,
      };
    default:
      throw new Error(`Unhandle type: ${action.type}`);
  }
}

const CurrentUserContext = createContext(initialState);

function useCurrentUser() {
  const [{ user, token }, dispatch] = useContext(CurrentUserContext);

  const logout = () => dispatch({ type: actionTypes.logout });

  const setUser = (payload) => dispatch({ type: actionTypes.setUser, payload });

  return { logout, setUser, user, token };
}

function CurrentUserStore({ children }) {
  const [state, dispatch] = useReducer(currentUserReducer, initialState);

  return (
    <CurrentUserContext.Provider value={[state, dispatch]}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserStore, CurrentUserContext, useCurrentUser, TOKEN };
