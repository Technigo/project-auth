import React, { useState } from 'react';
import { InputText } from './InputText.js';

export const Form = () => {
	const [ inputValue, setInputValue ] = useState({
		name: '',
		email: '',
		password: ''
	});

	return (
		<form>
			<InputText
				value={inputValue.name}
				name="name"
				label="Name"
				type="text"
				id="inputName"
				placeholder="Name"
				setInputValue={setInputValue}
				minLength="1"
			/>
			<InputText
				value={inputValue.email}
				name="email"
				label="Email"
				type="email"
				id="inputEmail"
				placeholder="Email"
				setInputValue={setInputValue}
				minLength="3"
			/>
			<InputText
				value={inputValue.password}
				name="password"
				label="Password"
				type="password"
				id="inputPassword"
				placeholder="Password"
				setInputValue={setInputValue}
				minLength="6"
			/>
			{console.log(inputValue)}
		</form>
	);
};
