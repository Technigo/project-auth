import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Main from './components/Main';
import Login from './components/Login';
import NotFound from './components/NotFound';

import user from './reducers/user';
import secrets from './reducers/secrets';

const reducer = combineReducers({
	user: user.reducer,
	secrets: secrets.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
	return (
		<Provider store={store}>
			{/*Provider can also be inside browser router*/}
			<BrowserRouter>
				<Routes>
					{/*Works in similar way as switch*/}
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
