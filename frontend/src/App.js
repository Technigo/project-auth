import React, { useState } from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import { FormLogin } from './components/FormLogin';
import { FormSignup } from './components/FormSignUp';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from './reducers/user';

export const App = () => {
	//Create reducer
	const reducer = combineReducers({ user: user.reducer });
	//Create store
	const store = configureStore({ reducer });

	const [displaySignup, setDisplaySignup] = useState(false);
	const [displayLogin, setDisplayLogin] = useState(true);

	const signupOnClick = () => {
		setDisplayLogin(false);
		setDisplaySignup(true);
	};

	return (
		<Provider store={store}>
			<Container>
				{displayLogin && (
					<>
						<FormLogin />
						<Button onClick={signupOnClick}>Signup</Button>
					</>
				)}

				{displaySignup && <FormSignup />}
			</Container>
		</Provider>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	align-items: center;
	justify-content: center;
	margin: 10px 0 50px 0;
	background: linear-gradient(45deg, #fc466b, #3f5efb);
`;

const Button = styled.button`
	display: block;
	margin-top: -200px;
	height: 30px;
	width: 150px;
	border-radius: 50px;
	background: transparent;
	border-top: 1px solid rgba(255, 255, 255, 0.2);
	font-size: 18px;
	font-weight: bold;
	color: grey;
	&:hover {
		background: lightgreen;
		cursor: pointer;
	}
`;
