import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { user } from '../reducers/user'
import styled from 'styled-components';

export const FormLogin = () => {
	const dispatch = useDispatch();
	const accessToken = useSelectors((store)=> store.user.login.accessToken);
	const LOGIN_URL =  'http://localhost:8080/sessions'
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const submitLogin = (e) => {
		e.preventDefault();

		fetch(LOGIN_URL, {
			method:'POST',
			body: JSON.stringify({ name: userName, password}),
			headers:{'Content-Type': 'application/json'},

		})
		.then((res) => {})





	};

	return (
		<div>
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
					required></Input>
			</label>

			<Button onClick={submitLogin}>
				Login
			</Button>
		</div>
	);
};

const Input = styled.input`
	margin: 10px;
`;

const Button = styled.button`
	margin: 5px;
`;
