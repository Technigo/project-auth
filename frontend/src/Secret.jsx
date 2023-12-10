import React, { useState, useEffect } from 'react';

// Import components
import { Button } from './components/Button';
import { Heading } from './components/Heading';
import { Paragraph } from './components/Paragraph';

// Secret component to display and manage secret messages
export const Secret = ({ user }) => {
    // State variable to store the secret message
    const [secretMessage, setSecretMessage] = useState(null);

    // useEffect hook to fetch the secret message when the 'user' prop changes
    useEffect(() => {
        fetchSecretMessage();
    }, [user]);

    // Function to fetch the secret message from the server
    const fetchSecretMessage = async () => {
        try {
            const response = await fetch('https://backend-auth-vxpp.onrender.com/secrets', {
                headers: {
                    Authorization: user.accessToken,
                },
            });

            if (response.ok) {
                // Set the secret message if the request is successful
                const data = await response.json();
                setSecretMessage(data.secret);
            } else {
                // Handle the case where fetching the secret message fails
                console.error('Failed to fetch secret message');
                setSecretMessage(null);
            }
        } catch (error) {
            // Handle network or other errors during secret message fetch
            console.error('Error during secret message fetch:', error);
            setSecretMessage(null);
        }
    };

    // Function to generate a new secret message
    const handleGenerateNewSecret = async () => {
        try {
            const response = await fetch('https://backend-auth-vxpp.onrender.com/secrets', {
                headers: {
                    Authorization: user.accessToken,
                },
            });

            if (response.ok) {
                // Set the new secret message if the request is successful
                const data = await response.json();
                setSecretMessage(data.secret);
            } else {
                // Handle the case where generating a new secret message fails
                console.error('Failed to generate new secret');
                setSecretMessage(null);
            }
        } catch (error) {
            // Handle network or other errors during new secret generation
            console.error('Error during new secret generation:', error);
            setSecretMessage(null);
        }
    };

    // JSX structure for the Secret component
    return (
        <div className='text-center'>
            {/* Heading for the secret message section */}
            <Heading text="Secret message" />

            {/* Conditional rendering based on the presence of a secret message */}
            {secretMessage ? (
                <div>
                    {/* Display the secret message with a specified size */}
                    <Paragraph text={secretMessage} size="xl p-2" />
                    {/* Button to generate a new secret message */}
                    <Button onClick={handleGenerateNewSecret} text="Generate New Secret" />
                </div>
            ) : (
                // Display a message while the secret message is being loaded
                <p>Loading secret message...</p>
            )}
        </div>
    );
};
