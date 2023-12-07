import React, { useState } from 'react';
import { Button } from './components/Button';
import { Heading } from './components/Heading';

export const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/sessions', {
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
                alert('Login failed');
            }
        } catch (error) {
            alert('Error during login:', error);
        }
    };

    return (
        <div>
            <Heading text="Login" />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <input className='display: block mt-2'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} text="Login" />

        </div>
    );
};

