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
				<Heading>Happy Thoughts</Heading>
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
background-image: url(./assets/background.jpg);
position: absolute;
background-size: cover; 
background-repeat: no-repeat; 
background-position: center; 

`
const Heading = styled.h1`
  color: #fff;
  text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 21px #fff,
      0 0 42px #5271ff,
      0 0 82px #5271ff,
      0 0 92px #5271ff,
      0 0 102px #5271ff,
      0 0 151px #5271ff;
  text-align: center;
  font-weight: 400;
  font-size: 5.2rem;
    animation: pulsate 0.11s ease-in-out infinite alternate;  
	
	@keyframes pulsate {
    
	100% {
  
		text-shadow:
		0 0 4px #fff,
		0 0 11px #fff,
		0 0 19px #fff,
		0 0 40px #5271ff,
		0 0 80px #5271ff,
		0 0 90px #5271ff,
		0 0 100px #5271ff,
		0 0 150px #5271ff;
	
	}
	
	0% {
  
	  text-shadow:
	  0 0 4px #fff,
	  0 0 10px #fff,
	  0 0 18px #fff,
	  0 0 38px #5271ff,
	  0 0 73px #5271ff,
	  0 0 80px #5271ff,
	  0 0 94px #5271ff,
	  0 0 140px #5271ff;
  
  }
}
`
