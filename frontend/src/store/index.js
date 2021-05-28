import { combineReducers, configureStore } from '@reduxjs/toolkit';
import session from './session';
import user from './user';
import secret from './secret';

const reducer = combineReducers({
  session,
  user,
  secret
});

export default configureStore({ reducer });
