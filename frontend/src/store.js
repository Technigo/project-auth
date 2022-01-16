import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { user } from './Reducers/user';
import { manga } from 'Reducers/manga'

const reducer = combineReducers({
    user: user.reducer,
    manga: manga.reducer,
})

export const store = configureStore({ reducer })
