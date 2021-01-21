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
			.then((res) => {
				if (!res.ok) {
					throw new Error('Signup failed');
				}
				return res.json();
			})
			.then((json) => json)
			.catch((err) => err);
	};

	return (
		<div>
			<h1>Sign up </h1>
			<Form OnSubmit={handleSignup}>
				<label>
					Choose username
					<input
						required
						type="text"
						name="select-username"
						value={userName}
						onChange={(event) => setUserName(event.target.value)}
						minlength="5"
						maxlength="30"
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
			</Form>
		</div>
	);
};

const Button = styled.button`
	display: block;
	margin: 30px 0;
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

const Form = styled.form`
	margin: -10px 0 0 0;
	background: rgba(255, 255, 255, 0.3);
	padding: 3em;
	height: 250px;
	width: 150px;
	border-radius: 20px;
	border-left: 1px solid rgba(255, 255, 255, 0.3);
	border-top: 1px solid rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(5px);
	box-shadow: 20px 20px 40px -6px rgba(0, 0, 0, 0.2);
	text-align: left;
	position: relative;
`;
