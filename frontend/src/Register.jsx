// imports
import React, { useState } from 'react';
import { Button } from './components/Button';
import { Heading } from './components/Heading';
import { ErrorComponent } from './components/ErrorComponent';
// Register component for user registration
export const Register = ({ onRegisterSuccess }) => {
    // State variables for form inputs, error message, and registration success status
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Function to validate the name field
    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z]{1,10}$/;
        return nameRegex.test(name);
    };

    // Function to validate the email field
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate the password field
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Function to handle the registration process
    const handleRegister = async () => {
        // Set loading state to indicate the registration is in progress
        setIsLoading(true);

        // Validate name
        if (!validateName(name)) {
            setError('Name must be between 1 and 10 characters and contain only letters.');
            setIsLoading(false); // Reset loading state
            return;
        }

        // Validate email
        if (!validateEmail(email)) {
            setError('Invalid email address.');
            setIsLoading(false); // Reset loading state
            return;
        }

        // Validate password
        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long.');
            setIsLoading(false); // Reset loading state
            return;
        }

        try {
            // Sending a POST request to register a user
            const response = await fetch('https://backend-auth-vxpp.onrender.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            // Check if registration is successful
            if (response.ok) {
                const data = await response.json();
                onRegisterSuccess(data.accessToken); // Pass the token to a handler
                setIsRegistrationSuccess(true);
                setName('');
                setEmail('');
                setPassword('');
                setError(null); // Reset error state on successful registration
            } else {
                // Handle registration failure
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
        } finally {
            // Reset loading state regardless of success or failure
            setIsLoading(false);
        }
    };

    // JSX for the Register component
    return (
        <div className="flex flex-col items-center justify-center">
            {/* Heading */}
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

            {/* Display error message if there is any */}
            {error && <ErrorComponent errorMessage={error} />}

            {/* Display success message if registration is successful */}
            {isRegistrationSuccess && (
                <p className="text-green-900 mt-2 px-4 py-2">
                    Registration successful!
                    <br />Please log in.
                </p>
            )}

            {/* Button to trigger the registration process */}
            <Button
                onClick={handleRegister}
                text={isLoading ? 'Registering...' : 'Register'} // Show loading state if registration is in progress
                disabled={isLoading} // Disable the button while registration is in progress
            />
        </div>
    );
};
