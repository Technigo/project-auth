import React, { useState } from 'react';
import { Button } from './components/Button';

export const Register = () => {
    // State to manage input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handler for the registration process
    const handleRegister = async () => {
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
                // Displaying a success message if registration is successful
                alert('Registration successful');

                // Clearing input fields after successful registration
                setName('');
                setEmail('');
                setPassword('');
            } else {
                // Displaying an error message if registration fails
                const data = await response.json();
                alert('Registration failed:', data.message);
            }
        } catch (error) {
            // Handling unexpected errors during the registration process
            alert('Error during registration:', error);
        }
    };

    return (
        <div>
            {/* Registration form */}
            <h2 className='text-3xl font-bold mt-10'>Register</h2>
            <input
                className='display: block mt-2'
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required  // Add the required attribute
            />
            <input
                className='display: block mt-2'
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required  // Add the required attribute
            />
            <input
                className='display: block mt-2'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required  // Add the required attribute
            />

            {/* Extensible Button component for registration */}
            <Button onClick={handleRegister} text="Register" />
        </div>
    );
};
