import React, { useState } from 'react';
import styled from 'styled-components';

export const FormSignup = () => {
	const SIGNUP_URL = 'https://nadlillmar.herokuapp.com/users';
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
			<h1>Sign up </h1>
			<form OnSubmit={handleSignup}>
			<label>
				Choose username
				<input 
					required
					type="text"
					name="select-username"
					value={userName}
					onChange={(event) => setUserName(event.target.value)}
					minlength="5"
					maxlength= "30"
				/>
			</label>
			<label>
				Choose password
				<input
					required
					type="password"
					name="select-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					minlength="5"
				/>
			</label>
			<label>
				Your email
				<input
					required
					type="text"
					name="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					minlength="5"
				/>
			</label>
			<Button type="submit">Create user</Button>
		</form>
		</div>
	);
};

const Input = styled.input`
	margin: 10px;
`;

const Button = styled.button`
	margin: 5px;
`;
