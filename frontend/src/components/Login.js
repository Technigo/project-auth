import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from '../utils/constants';
import user from 'reducers/user';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signup');

	const accessToken = useSelector((store) => store.user.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		//don't need to add '/' before secrets, already added in endpoint
		if (accessToken) {
			navigate('/');
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		//prevents a default behaviour
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		};

		// added mode instead of signup
		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					//batch increase the performance speed by combining dispatches below
					//updates them all in one go instead of one at a time
					batch(() => {
						dispatch(user.actions.setUserId(data.response.userId));
						dispatch(user.actions.setUsername(data.response.username));
						dispatch(user.actions.setAccessToken(data.response.accessToken));
						dispatch(user.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(user.actions.setUserId(null));
						dispatch(user.actions.setUsername(null));
						dispatch(user.actions.setAccessToken(null));
						dispatch(user.actions.setError(data.response));
					});
				}
			});
	};

	//To check the radio buttons
	// console.log('MODE', mode);

	//Connecting label and input via id and htmlFor for accessibility reasons
	return (
		<>
			<div>
				<Link to="/"> To '/' ! </Link>{' '}
			</div>
			<label htmlFor="signup">Sign Up</label>
			<input
				id="signup"
				type="radio"
				//only checked if the mode is set to signup
				checked={mode === 'signup'}
				onChange={() => setMode('signup')}
			/>
			<label htmlFor="signin">Sign In</label>
			<input
				id="signin"
				type="radio"
				checked={mode === 'signin'}
				onChange={() => setMode('signin')}
			/>
			<form onSubmit={onFormSubmit}>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Login;
