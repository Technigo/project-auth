import React, { useState, useEffect } from 'react';

const Dashboard = ({ accessToken, onLogout }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://authentication-j1oa.onrender.com/secrets', {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    // Handle error
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error during API request:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [accessToken]);

    const handleLogout = () => {
        // Perform any necessary cleanup or logout logic
        onLogout();
    };

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1>Welcome to Your Dashboard, {userData?.name || 'User'}!</h1>
                    {/* Display user-specific content or actions */}
                    {userData ? (
                        <div>
                            <p>{userData.secret}</p>
                            {/* Render other user-specific data */}
                        </div>
                    ) : (
                        <p>No user data available</p>
                    )}
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default Dashboard;
