// src/components/Register.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // State to store form data
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    // Access the history object to navigate between pages
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make a POST request to your registration endpoint with formData
        // Handle success by saving the access token to local storage
        // Redirect to the dashboard page
        try {
            // Make a POST request to the registration endpoint
            const response = await fetch('http://your-api-url/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the request was successful (status code 2xx)
            if (response.ok) {
                // Parse the response JSON to get the access token
                const data = await response.json();

                // Save the access token to local storage
                localStorage.setItem('accessToken', data.accessToken);

                // Redirect to the dashboard page
                navigate.push('/dashboard');
            } else {
                // Handle registration error (status code is not 2xx)
                const errorData = await response.json();
                console.error('Registration error:', errorData.error);
                // Display an error message to the user, e.g., set a state variable for displaying an error message
            }
        } catch (error) {
            // Handle network errors or other unexpected errors
            console.error('Unexpected error during registration:', error);
            // Display a generic error message to the user
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {/* Registration form fields */}
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                {/* Submit button */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
