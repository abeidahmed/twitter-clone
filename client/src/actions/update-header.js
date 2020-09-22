import { UPDATE_PAGE_TITLE } from './types';

export function updateHeader(payload) {
  return {
    type: UPDATE_PAGE_TITLE,
    payload,
  };
}
