// src/components/Dashboard.js
import { useEffect, useState } from 'react';

const Dashboard = () => {
    // State to store the content received from the server
    const [content, setContent] = useState('');
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        // Check if there is an access token
        if (!accessToken) {
            // Redirect to the sign-in page if there is no access token
            // You can use the useHistory hook from react-router-dom for navigation
            // Example: import { useHistory } from 'react-router-dom'; const history = useHistory(); history.push('/sign-in');
        } else {
            // Make a GET request to your authenticated endpoint with the access token
            fetch('http://your-api-url/auth/protected', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
                },
            })
                .then((response) => {
                    if (response.ok) {
                        // If the response is successful (status code 2xx), parse the JSON
                        return response.json();
                    } else {
                        // If the response is not successful, throw an error
                        throw new Error('Failed to fetch content');
                    }
                })
                .then((data) => {
                    // Update the content state with the response data
                    setContent(data.message);
                })
                .catch((error) => {
                    // Handle errors, e.g., log the error and display a generic error message to the user
                    console.error('Error fetching content:', error);
                    setContent('Error fetching content');
                });
        }
    }, [accessToken]);

    const handleSignOut = () => {
        // Remove the access token from local storage
        // Redirect to the sign-in page
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleSignOut}>Sign Out</button>
            <div>{content}</div>
        </div>
    );
};

export default Dashboard;
