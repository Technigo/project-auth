import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../reducers/user';
import styled from 'styled-components';

import { Profile } from './Profile.js';

export const FormLogin = () => {
	const dispatch = useDispatch();
	const accessToken = useSelector((store) => store.user.login.accessToken);
	const statusMessage = useSelector((store) => store.user.login.statusMessage);
	const LOGIN_URL = 'https://nadlillmar.herokuapp.com/sessions';
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [displayLoggedIn, setDisplayLoggedIn] = useState(false);
	const [displayError, setDisplayError] = useState(false);

	const handleLoginSuccess = (loginResponse) => {
		const statusMessage = JSON.stringify(loginResponse);
		//?for debugging
		dispatch(user.actions.setStatusMessage({ statusMessage }));

		//?save login info
		dispatch(user.actions.setUserId({ userId: loginResponse.userId }));

		dispatch(
			user.actions.setAccessToken({ accessToken: loginResponse.accessToken })
		);

		setDisplayLoggedIn(true);
		setDisplayError(false);
	};

	const handleLoginFailed = (loginError) => {
		const statusMessage = JSON.stringify(loginError);
		console.log(`Statusmessage ${statusMessage}`);
		dispatch(user.actions.setStatusMessage({ statusMessage }));
		console.log(`Statusmessage ${statusMessage}`);
		setDisplayError(true);
	};

	const submitLogin = (e) => {
		e.preventDefault();

		fetch(LOGIN_URL, {
			method: 'POST',
			body: JSON.stringify({ name: userName, password }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				if (!res.ok){
					throw 'Login failed'
				}
				return 	res.json();
			})
			.then((json) => handleLoginSuccess(json))
			.catch((err) => handleLoginFailed(err));
	};

	return (
		<Container>
			<h1>Login </h1>
			<Form onSubmit={submitLogin}>
				<label>
					Username:
					<input
						type="text"
						name="username"
						value={userName}
						onChange={(event) => setUserName(event.target.value)}
						required
						minLength="5"
						maxLength= "30"
					/>
				</label>

				<label>
					Password:
					<input
						type="password"
						name="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
						minLength="5"
					/>
				</label>

				<Button type="submit">Login</Button>
			</Form>
			{displayError && <div >{`Errormessage: ${statusMessage}`}</div>}
			{displayLoggedIn && <Profile />}
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
const Form = styled.form``;
