import React, { createContext, useContext, useReducer } from 'react';

const actionTypes = {
  open: 'OPEN',
  close: 'CLOSE',
};

const initialState = {
  isActive: false,
};

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.open:
      return {
        isActive: true,
      };
    case actionTypes.close:
      return {
        ...initialState,
      };
    default:
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

const SidebarContext = createContext(initialState);

function useSidebarToggle() {
  const [{ isActive }, dispatch] = useContext(SidebarContext);

  const setOn = () => dispatch({ type: actionTypes.open });
  const setOff = () => dispatch({ type: actionTypes.close });

  return { setOn, setOff, isActive };
}

function SidebarStore({ children }) {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  return (
    <SidebarContext.Provider value={[state, dispatch]}>
      {children}
    </SidebarContext.Provider>
  );
}

export { actionTypes, SidebarContext, SidebarStore, useSidebarToggle };
