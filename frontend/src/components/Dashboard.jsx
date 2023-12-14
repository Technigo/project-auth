// src/components/Dashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
    const [content, setContent] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        if (!accessToken) {
            // Redirect to the sign-in page using useNavigate
            navigate('/login');
        } else {
            fetch('`${import.meta.env.VITE_API_URL}/user/protected`', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to fetch content');
                    }
                })
                .then((data) => {
                    setContent(data.message);
                })
                .catch((error) => {
                    console.error('Error fetching content:', error);
                    setContent('Error fetching content');
                });
        }
    }, [accessToken, navigate]); // Include navigate in the dependencies

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        navigate('/login'); // Redirect to the sign-in page
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
