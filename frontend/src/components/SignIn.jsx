// src/components/SignIn.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    // State to store form data
    const [formData, setFormData] = useState({ username: '', password: '' });
    // Access the history object to navigate between pages
    const navigate = useNavigate();

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

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.accessToken);
                navigate('/dashboard'); // Use navigate to redirect
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData.error);
                // Handle login error
            }
        } catch (error) {
            console.error('Unexpected error during login:', error);
            // Handle unexpected error
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
