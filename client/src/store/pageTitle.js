import React, {
  useReducer,
  createContext,
  useEffect,
  useContext,
  useMemo,
} from 'react';

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
      throw new Error(`Unhandled type: ${action.type}`);
  }
}

const PageTitleContext = createContext(initialState);

function useSetTitle(title, description) {
  const [, dispatch] = useContext(PageTitleContext);

  const meta = useMemo(() => {
    return {
      title,
      description,
    };
  }, [title, description]);

  /* eslint-disable */
  useEffect(() => {
    dispatch({
      type: actionTypes.updatePageTitle,
      payload: meta,
    });
  }, [meta]);
  /* eslint-enable */
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
