// src/components/SignIn.js
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    // State to store form data
    const [formData, setFormData] = useState({ username: '', password: '' });
    // Access the history object to navigate between pages
    const history = useHistory();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to the login endpoint
            const response = await fetch('http://your-api-url/auth/login', {
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
                history.push('/dashboard');
            } else {
                // Handle login error (status code is not 2xx)
                const errorData = await response.json();
                console.error('Login error:', errorData.error);
                // Display an error message to the user, e.g., set a state variable for displaying an error message
            }
        } catch (error) {
            // Handle network errors or other unexpected errors
            console.error('Unexpected error during login:', error);
            // Display a generic error message to the user
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                {/* Sign-in form fields */}
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                {/* Submit button */}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
