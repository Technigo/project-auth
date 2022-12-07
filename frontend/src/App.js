import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Login from './components/Login';
//import Order from './components/Order'
import userSlice from 'reducers/userSlice';
import Thoughts from 'components/Thoughts';

const reducer = combineReducers({
	user: userSlice.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/thoughts" element={<Thoughts />} />
						<Route path="/login" element={<LogOut />} />
					</Routes>
				</div>
			</BrowserRouter>
		</Provider>
	);
};
