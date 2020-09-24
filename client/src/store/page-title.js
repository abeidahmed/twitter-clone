import React, { useReducer, createContext, useEffect, useContext } from 'react';

const actionTypes = {
  updatePageTitle: 'UPDATE_PAGE_TITLE',
};

const initialState = {
  title: '',
  description: '',
};

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.updatePageTitle:
      return {
        title: action.payload.title,
        description: action.payload.description,
      };
    default:
      return state;
  }
}

const PageTitleContext = createContext(initialState);

function useSetTitle(title, description) {
  const [state, dispatch] = useContext(PageTitleContext);

  const meta = {
    title,
    description,
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.updatePageTitle,
      payload: meta,
    });
  }, [title, description]);
}

function PageTitleStore({ children }) {
  const [state, dispatch] = useReducer(headerReducer, initialState);

  return (
    <PageTitleContext.Provider value={[state, dispatch]}>
      {children}
    </PageTitleContext.Provider>
  );
}

export { actionTypes, PageTitleContext, PageTitleStore, useSetTitle };
