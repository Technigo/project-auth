import React, { useState } from 'react';
import styled from 'styled-components';

export const FormSignup = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

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
			<Button type="submit">Confirm signup</Button>
		</div>
	);
};

const Input = styled.input`
	margin: 10px;
`;

const Button = styled.button`
	margin: 5px;
`;
