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
				<Label>
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
				</Label>
				<Label>
					Choose password
					<input
						required
						type="password"
						name="select-password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						minlength="5"
					/>
				</Label>
				<Label>
					Your email
					<input
						required
						type="text"
						name="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						minlength="5"
					/>
				</Label>
				<Button type="submit">Create user</Button>
			</Form>
		</div>
	);
};

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

const Label = styled.label`
	color: grey;
	font-size: 13px;
`;

const Button = styled.button`
	display: block;
	margin: 30px 0;
	height: 30px;
	width: 150px;
	border-radius: 50px;
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
