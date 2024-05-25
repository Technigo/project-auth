import { useState } from 'react';
import axios from 'axios';

const SignInForm = ({ onSignInSuccess }) => {
	// State to store form data
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	// State to store error message
	const [error, setError] = useState('');

	// Handle form input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');


		try {
			// Send form data to backend API for sign-in
			const response = await axios.post('https://project-auth-2zcr.onrender.com/login', formData);
			if (response.status === 200) {
				const accessToken = response.data.accessToken;
				const username = response.data.username;
				onSignInSuccess(username);  // Pass the username to the parent component
				/*   console.log('Sign-in successful. Access token:', accessToken); */
				// Reset form fields
				setFormData({ email: '', password: '' });
				// Store access token in sessionStorage
				sessionStorage.setItem('accessToken', accessToken);
			}
		} catch (error) {
			console.error('Error:', error);
			// Sign-in failed
			setError(error.response?.data?.error || 'Something went wrong');
		}
	};


	return (
		<div className="form-container">
			<h2 className="form-heading">Please sign in to continue.</h2>
			<form onSubmit={handleSubmit} className="form">
				<div className="input-group">
					<label htmlFor="email" className="label">Email:</label>
					<input
						type="email"
						id="email2"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className="input"
						required
					/>
				</div>
				<div className="input-group">
					<label htmlFor="password" className="label">Password:</label>
					<input
						type="password"
						id="password2"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						className="input"
						minLength={6}
						required
					/>
				</div>
				<button type="submit" className="button">Sign In</button>
			</form>
			{error && <div className="error">{error}</div>}
		</div>
	);
};

export default SignInForm;
