// src/components/Dashboard.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UseAuthStore from '../store/authStore'; // Adjust the path

const Dashboard = () => {
    const [content, setContent] = useState('');
    const accessToken = UseAuthStore((state) => state.accessToken);
    const logout = UseAuthStore((state) => state.logout);
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            // Redirect to the sign-in page using useNavigate
            navigate('/login');
        } else {
            fetch(`${import.meta.env.VITE_API_URL}/user/protected`, {
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
    }, [accessToken, navigate]);

    const handleSignOut = () => {
        // Use the logout action from the store
        logout();
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

