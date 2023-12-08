import React, { useState } from 'react';
import { Button } from './components/Button';
import { Heading } from './components/Heading';

export const Login = ({ onLogin }) => {
    // State to manage input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                // Displaying an error message if login fails
                alert('Login failed');
            }
        } catch (error) {
            // Handling unexpected errors during the login process
            alert('Error during login:', error);
        }
    };

    return (
        <div>
            {/* Login form */}
            <Heading text="Login" />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className='display: block mt-2'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* Extensible Button component for login */}
            <Button onClick={handleLogin} text="Login" />

        </div>
    );
};
