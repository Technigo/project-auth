import { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
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
            const response = await axios.post('/login', formData); // Assuming proxy is set up for backend
            console.log(response.data);
            // Sign-in successful
            const accessToken = response.data.accessToken;
            console.log('Sign-in successful. Access token:', accessToken);
            // Reset form fields
            setFormData({ email: '', password: '' });
            // Store access token in localStorage or sessionStorage
            sessionStorage.setItem('accessToken', accessToken);
        } catch (error) {
            console.error('Error:', error);
            // Sign-in failed
            setError(error.response.data.error || 'Something went wrong');
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Welcome back! Please sign in to continue.</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label htmlFor="email" className="label">Email:</label>
                    <input
                        type="email"
                        id="email"
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
                        id="password"
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
