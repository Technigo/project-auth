import React, { useState, useEffect } from 'react';


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

    return (
        <div>
            <h2>Secret Message</h2>
            {secretMessage ? (
                <p>{secretMessage}</p>
            ) : (
                <p>Loading secret message...</p>
            )}
        </div>
    );
};

