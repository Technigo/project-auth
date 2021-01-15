import React, { useState } from 'react';
import styled from 'styled-components';
import  { Provider } from 'react-redux'

import { FormLogin } from './components/FormLogin';
import { FormSignup } from './components/FormSignUp';
 
import { combineReducers, configureStore} from '@reduxjs/toolkit'
import { user } from './reducers/user';

export const App = () => {
	//Create reducer
	const reducer = combineReducers({ user: user.reducer});
	//Create store
	const store = configureStore({reducer});

	const [displaySignup, setDisplaySignup] = useState(false);
	const [displayLogin, setDisplayLogin] = useState(true);
	

	const signupOnClick = () => {
		setDisplayLogin(false);
		setDisplaySignup(true);
	};

	return (
	< Provider store={store}>
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
	justify-content: center;
	align-items: center;
	margin: 250px;
`;

const Button = styled.button`
	margin: 5px;
`;
