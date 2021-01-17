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
	position: absolute;
	transform: translate(-50%, -50%);
	top: 50%;
	left: 50%;
	justify-content: center;
	border-radius: 10px;
	padding: 40px 50px 40px 50px;
`;

const Button = styled.button`
	margin: 30px 0;
	height: 30px;
	width: 90px;
	border-radius: 5px;
	background: ${(props) => props.background || 'transparent;'};
	border-top-color: transparent;
	font-size: 18px;
	font-weight: bold;
	color: ${(props) => props.color || 'grey'};
	&:hover {
		background: ${(props) => props.hover || 'lightgreen'};
		cursor: pointer;
	}
`;
