import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Login from './components/Login';
import userSlice from 'reducers/userSlice';
import Thoughts from 'components/Thoughts';

import styled from 'styled-components';

const reducer = combineReducers({
	user: userSlice.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
	return (
		<Wrapper>
		<Provider store={store}>
			<BrowserRouter>
			
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/thoughts" element={<Thoughts />} />
						{/* <Route path="/login" element={<LogOut />} /> */}
					</Routes>
				
			</BrowserRouter>
		</Provider>
		</Wrapper>
	);
};

const Wrapper = styled.section`
border: solid 5px black; 
`
