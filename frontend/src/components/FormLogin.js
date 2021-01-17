import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { user } from '../reducers/user';
import { Profile } from './Profile.js';

export const FormLogin = () => {
	const dispatch = useDispatch();
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

		dispatch(user.actions.toggledLoggedState(true));

		setDisplayLoggedIn(true);
		setDisplayError(false);
	};

	const handleLoginFailed = (loginError) => {
		dispatch(user.actions.setStatusMessage({ statusMessage: 'Login failed' }));
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
				if (!res.ok) {
					throw new Error('Login failed');
				}
				return res.json();
			})
			.then((json) => handleLoginSuccess(json))
			.catch((err) => handleLoginFailed(err));
	};

	return (
		<Container>
			{!displayLoggedIn && (
				<Form onSubmit={submitLogin}>
					<h1>Login </h1>
					<Label>
						Username:
						<input
							type="text"
							name="username"
							value={userName}
							onChange={(event) => setUserName(event.target.value)}
							required
							minLength="5"
							maxLength="30"
						/>
					</Label>

					<Label>
						Password:
						<input
							type="password"
							name="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
							minLength="5"
						/>
					</Label>

					<Button type="submit">Login</Button>
				</Form>
			)}

			{displayError && <div>{`Errormessage: ${statusMessage}`}</div>}
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

const Label = styled.label`
	color: grey;
	font-size: 13px;
`;

const Input = styled.input`
	background: transparent;
	width: 200px;
	padding: 1em;
	margin-bottom: 2em;
	border: none;
	border-left: 1px solid rgba(255, 255, 255, 0.3);
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 50px;
	backdrop-filter: blur(5px);
	box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
	color: #fff;
	font-family: Montserrat, sans-serif;
	font-weight: 500;
	transition: all 0.2s ease-in-out;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	&:hover {
		background: rgba(144, 238, 144);
		box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
	}
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

//input should be contained in a form
const Form = styled.form`
	margin: 130px 0 0 0;
	background: rgba(255, 255, 255, 0.3);
	padding: 3em;
	height: 300px;
	border-radius: 20px;
	border-left: 1px solid rgba(255, 255, 255, 0.3);
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(5px);
	box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
	text-align: left;
	position: relative;
`;
