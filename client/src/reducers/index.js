import { combineReducers } from 'redux';
import { currentUser } from './current-user';
import { sidebar } from './sidebar';

export const rootReducer = combineReducers({
  currentUser,
  sidebar,
});
