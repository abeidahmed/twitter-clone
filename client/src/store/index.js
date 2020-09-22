import { createStore, compose } from 'redux';
import { rootReducer } from 'reducers';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
  }) || compose;

export const store = createStore(rootReducer, composeEnhancers());
