import React, { useState } from 'react';
import styled from 'styled-components';

export const FormLogin = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const submitLogin = () => {};

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

			<Button type="submit" onClick={submitLogin}>
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
