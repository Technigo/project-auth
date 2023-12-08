import React, { useEffect } from 'react';

export const Loggedin = () => {
    const {  user } = userStore()
    useEffect(() => {
        // Fetch content from your /logged-in endpoint
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/logged-in', {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`, // Include the user's token
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                } else {
                    console.error('Failed to fetch authenticated content');
                }
            } catch (error) {
                console.error('Error fetching authenticated content:', error);
            }
        };

        fetchData();
    }, [user.accessToken]);

    return (
        <div>
            <p>SECRET!!!</p>
        </div>
    );
};
