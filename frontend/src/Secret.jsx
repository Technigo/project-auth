import React, { useState, useEffect } from 'react';

//components
import { Button } from './components/Button';
import { Heading } from './components/Heading';
import { Paragraph } from './components/Paragraph';

export const Secret = ({ user }) => {
    const [secretMessage, setSecretMessage] = useState(null);

    useEffect(() => {
        fetchSecretMessage();
    }, [user]);

    const fetchSecretMessage = async () => {
        try {
            const response = await fetch('https://backend-auth-vxpp.onrender.com/secrets', {
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

    //get secrets
    const handleGenerateNewSecret = async () => {
        try {
            const response = await fetch('https://backend-auth-vxpp.onrender.com/secrets', {
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
            <Heading text="Secret message" />
            {secretMessage ? (
                <div>
                    <Paragraph text={secretMessage} size="xl p-2" />
                    <Button onClick={handleGenerateNewSecret} text="Generate New Secret" />
                </div>
            ) : (
                <p>Loading secret message...</p>
            )}
        </div>
    );
};
