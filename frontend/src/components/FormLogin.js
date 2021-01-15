import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { user } from '../reducers/user'
import styled from 'styled-components';

import { Profile } from './Profile.js';

export const FormLogin = () => {
	const dispatch = useDispatch();
	const accessToken = useSelector((store)=> store.user.login.accessToken);
	const LOGIN_URL =  'https://lmn-app.herokuapp.com/sessions'
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [displayLoggedIn, setDisplayLoggedIn] = useState(false);

	const handleLoginSuccess = (loginResponse) => {
		const statusMessage = JSON.stringify(loginResponse);
	//?for debugging
		dispatch(user.actions.setStatusMessage({ statusMessage }));
	
		//?save login info
		dispatch(
			user.actions.setUserId({ userId: loginResponse.userId }));

			dispatch(user.actions.setAccessToken({accessToken}))

			setDisplayLoggedIn(true);
	};

	const handleLoginFailed = (loginError) => {
		const statusMessage = JSON.stringify(loginError);
		dispatch(user.actions.setStatusMessage({ statusMessage }));
	};

	const submitLogin = (e) => {
		e.preventDefault();
		

		fetch(LOGIN_URL, {
			method:'POST',
			body: JSON.stringify({ name: userName, password}),
			headers:{'Content-Type': 'application/json'},

		})
		.then((res) => res.json())
		.then((json) => handleLoginSuccess(json))
		.then((err) => handleLoginFailed(err));
	};

	//! Move to App.js?
	// if(!accessToken)

	return (
		<Container>
		<Form>
			<label>
			Username
				<Input
					type="text"
					name="username"
					value={userName}
					onChange={(event) => setUserName(event.target.value)}
					required></Input>
			</label>

			<label>
				Password
				<Input
					type="password"
					name="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required>
				</Input>
			</label>

			<Button onClick={submitLogin}>
				Login
			</Button>
		</Form>

		{displayLoggedIn && <Profile /> }
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 250px;
`;

const Input = styled.input`
	margin: 10px;
`;

const Button = styled.button`
	margin: 5px;
`;

//input should be contained in a form
const Form = styled.form`
`
