import React, { useState } from 'react';
import { Button } from './components/Button';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                alert('Registration successful');
            } else {
                const data = await response.json();
                alert('Registration failed:', data.message);
            }
        } catch (error) {
            alert('Error during registration:', error);
        }
    };

    return (
        <div>
            <h2 className='text-3xl font-bold mt-10'>Register</h2>
            <input className='display: block mt-2'
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input className='display: block mt-2'
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className='display: block mt-2'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister} text="Register" />
        </div>
    );
};


