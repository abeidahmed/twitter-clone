import React, { createContext, useReducer, useContext } from 'react';

const actionTypes = {
  open: 'OPEN_MODAL',
  close: 'CLOSE_MODAL',
};

const initialState = {
  modalType: 'EDIT_PROFILE',
  modalProps: {},
};

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.open:
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    case actionTypes.close:
      return {
        initialState,
      };
    default:
      return state;
  }
}

const ModalContext = createContext(initialState);

function useModalType() {
  const [{ modalType, modalProps }, dispatch] = useContext(ModalContext);

  const modalOn = (payload) => dispatch({ type: actionTypes.open, payload });

  const modalOff = () => dispatch({ type: actionTypes.close });

  return { modalOn, modalOff, modalType, modalProps };
}

function ModalStore({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={[state, dispatch]}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalStore, ModalContext, useModalType, actionTypes };
