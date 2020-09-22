import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from 'actions/types';

const initialState = {
  sidebar: false,
};

export function sidebar(state = initialState, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        sidebar: true,
      };
    case CLOSE_SIDEBAR:
      return {
        initialState,
      };
    default:
      return state;
  }
}
