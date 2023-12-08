import React, { useState } from 'react';
import { Button } from './components/Button';
import { Heading } from './components/Heading';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]{1,10}$/;
        return nameRegex.test(name);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        if (!validateName(name)) {
            setError('Name must be between 1 and 10 characters and contain only letters.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Invalid email address.');
            return;
        }

        // Rest of the registration logic...

        try {
            // Sending a POST request to register a user
            const response = await fetch('https://backend-auth-vxpp.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setIsRegistrationSuccess(true);
                setName('');
                setEmail('');
                setPassword('');
                setError(null); // Reset error state on successful registration
            } else {
                const data = await response.json();

                if (response.status === 400 && data.message === 'Email is already in use.') {
                    setError('User with this email is already registered. Please log in.');
                } else {
                    setError(`Registration failed: ${data.message}`);
                }
            }
        } catch (error) {
            setError(`Error during registration: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Heading text="Register" />
            <input
                className="mt-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
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

            {isRegistrationSuccess && (
                <p className="text-green-900 mt-2 px-4 py-2">
                    Registration successful!
                    <br />Please log in.
                </p>
            )}

            <Button onClick={handleRegister} text="Register" />
        </div>
    );
};
