import React, { useState, useEffect } from 'react';
import { Button } from './components/Button';

export const Secret = ({ user }) => {
    const [secretMessage, setSecretMessage] = useState(null);

    useEffect(() => {
        fetchSecretMessage();
    }, [user]);

    const fetchSecretMessage = async () => {
        try {
            const response = await fetch('http://localhost:8080/secrets', {
                headers: {
                    Authorization: user.accessToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSecretMessage(data.secret);
            } else {
                console.error('Failed to fetch secret message');
                setSecretMessage(null);
            }
        } catch (error) {
            console.error('Error during secret message fetch:', error);
            setSecretMessage(null);
        }
    };

    const handleGenerateNewSecret = async () => {
        try {
            const response = await fetch('http://localhost:8080/secrets', {
                headers: {
                    Authorization: user.accessToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSecretMessage(data.secret);
            } else {
                console.error('Failed to generate new secret');
                setSecretMessage(null);
            }
        } catch (error) {
            console.error('Error during new secret generation:', error);
            setSecretMessage(null);
        }
    };

    return (
        <div className='text-center'>
            <h2>Secret Message</h2>
            {secretMessage ? (
                <div>
                    <p>{secretMessage}</p>
                    <Button onClick={handleGenerateNewSecret} text="Generate New Secret" />
                </div>
            ) : (
                <p>Loading secret message...</p>
            )}
        </div>
    );
};
