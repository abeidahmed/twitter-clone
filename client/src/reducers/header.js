import { UPDATE_PAGE_TITLE } from 'actions/types';

const initialState = {
  title: '',
  description: '',
};

export function header(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGE_TITLE:
      return {
        title: action.payload.title,
        description: action.payload.description,
      };
    default:
      return state;
  }
}
