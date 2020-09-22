import { combineReducers } from 'redux';
import { currentUser } from './current-user';
import { header } from './header';
import { sidebar } from './sidebar';

export const rootReducer = combineReducers({
  currentUser,
  header,
  sidebar,
});
