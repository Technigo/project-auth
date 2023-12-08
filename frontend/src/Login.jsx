import React, { useState } from 'react';
import { Button } from './components/Button';
import { Heading } from './components/Heading';

export const Login = ({ onLogin }) => {
    // State to manage input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // New state for error message

    // Handler for the login process
    const handleLogin = async () => {
        try {
            // Sending a POST request to authenticate the user
            const response = await fetch('https://backend-auth-vxpp.onrender.com/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // If authentication is successful, call the onLogin callback
                const data = await response.json();
                onLogin(data);
            } else {
                // If login fails, update the error state with the user-friendly error message
                const errorData = await response.json();

                if (response.status === 401 && errorData.error === 'Invalid email or password') {
                    // Display a specific message for invalid email or password
                    setError('Invalid email or password. Please try again.');
                } else {
                    // Display a general error message
                    setError(`Login failed: ${errorData.error}`);
                }
            }
        } catch (error) {
            // Handling unexpected errors during the login process
            setError(`Error during login: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Login form */}
            <Heading text="Login" />
            <input
                className="mt-2"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                className="mt-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {/* Display error message if present */}
            {error && <p className="text-red-500 h-8 text-center">{error}</p>}

            {/* Extensible Button component for login */}
            <Button onClick={handleLogin} text="Login" />
        </div>
    );
};
