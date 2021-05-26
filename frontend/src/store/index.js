import { combineReducers, configureStore } from '@reduxjs/toolkit';
import session from './session';

const reducer = combineReducers({
  session
});

export default configureStore({reducer});
