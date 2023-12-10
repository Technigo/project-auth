import React, { useState } from 'react';
import { Button } from './components/Button';
import { Heading } from './components/Heading';

// Register component for user registration
export const Register = () => {
    // State variables for form input values, error handling, and registration success
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    // Function to validate the name using a regex pattern
    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]{1,10}$/;
        return nameRegex.test(name);
    };

    // Function to validate the email using a regex pattern
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to handle the registration process
    const handleRegister = async () => {
        // Validate name
        if (!validateName(name)) {
            setError('Name must be between 1 and 10 characters and contain only letters.');
            return;
        }

        // Validate email
        if (!validateEmail(email)) {
            setError('Invalid email address.');
            return;
        }

        // Registration logic...
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
                // Set registration success state and reset form inputs
                setIsRegistrationSuccess(true);
                setName('');
                setEmail('');
                setPassword('');
                setError(null); // Reset error state on successful registration
            } else {
                // Handle registration failure and display appropriate error message
                const data = await response.json();
                if (response.status === 400 && data.message === 'Email is already in use.') {
                    setError('User with this email is already registered. Please log in.');
                } else {
                    setError(`Registration failed: ${data.message}`);
                }
            }
        } catch (error) {
            // Handle network or other errors during registration
            setError(`Error during registration: ${error.message}`);
        }
    };

    // JSX structure for the Register component
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Heading for the registration form */}
            <Heading text="Register" />

            {/* Input fields for name, email, and password */}
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

            {/* Display error message if there is an error */}
            {error && <p className="text-red-500 h-8 text-center">{error}</p>}

            {/* Display success message if registration is successful */}
            {isRegistrationSuccess && (
                <p className="text-green-900 mt-2 px-4 py-2">
                    Registration successful!
                    <br />Please log in.
                </p>
            )}

            {/* Button to trigger the registration process */}
            <Button onClick={handleRegister} text="Register" />
        </div>
    );
};
