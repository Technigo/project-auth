// Login.jsx
import React, { useState } from 'react';
import { Button } from './components/Button';
import { Heading } from './components/Heading';

export const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('https://backend-auth-vxpp.onrender.com/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                onLogin(data);
            } else {
                const errorData = await response.json();

                if (response.status === 401 && errorData.error === 'Invalid email or password') {
                    setError('Invalid email or password. Please try again.');
                } else {
                    setError(`Login failed: ${errorData.error}`);
                }
            }
        } catch (error) {
            setError(`Error during login: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
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

            {error && <p className="text-red-500 h-8 text-center">{error}</p>}

            <Button onClick={handleLogin} text="Login" />
        </div>
    );
};