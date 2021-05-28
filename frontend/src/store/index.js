import { combineReducers, configureStore } from '@reduxjs/toolkit';
import session from './session';
import user from './user';

const reducer = combineReducers({
  session,
  user
});

export default configureStore({ reducer });
