import React from 'react';

export const InputText = ({ label, type, id, placeholder, value, name, setInputValue, minLength }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValue((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				required
				minLength={minLength}
			/>
		</div>
	);
};
