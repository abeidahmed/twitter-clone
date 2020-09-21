import React, { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import { reducer } from 'reducers';

const initialState = {
  user: {},
  token: Cookies.get('token'),
};

export const Context = createContext(initialState);

export default function Store({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
}
