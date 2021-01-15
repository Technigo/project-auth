import React, { useState } from 'react';
import styled from 'styled-components';

export const FormSignup = () => {
	const SIGNUP_URL = 'https://lmn-app.herokuapp.com/users';
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const handleSignup = (event) => {
		event.preventDefault();

		fetch(SIGNUP_URL, {
			method: 'POST',
			body: JSON.stringify({ name: userName, password, email }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => res.json())
			.then((json) => json)
			.catch((err) => ('error:', err));
	};

	return (
		<div>
			<label>
				Choose username
				<Input
					required
					type="text"
					name="select-username"
					value={userName}
					onChange={(event) => setUserName(event.target.value)}></Input>
			</label>
			<label>
				Choose password
				<Input
					required
					type="password"
					name="select-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}></Input>
			</label>
			<label>
				Your email
				<Input
					required
					type="text"
					name="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}></Input>
			</label>
			<Button onClick={handleSignup}>Confirm signup</Button>
		</div>
	);
};

const Input = styled.input`
	margin: 10px;
`;

const Button = styled.button`
	margin: 5px;
`;
