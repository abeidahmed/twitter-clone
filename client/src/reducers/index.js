import { combineReducers } from 'redux';
import { currentUser } from './current-user';

export const rootReducer = combineReducers({
  currentUser,
});
