import React, { useState, useEffect } from 'react';
import { Container, Header, StyledButton, Paragraph } from './StyledComponents';
import { useNavigate } from 'react-router-dom';

const API_CONTENT_URL = 'http://localhost:8080/api/users/content'; // Adjust the endpoint if necessary!!!

const Dashboard = ({ user, setToken }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User in Dashboard:', user);
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Stored token:', token);

        if (!token) {
          setLoading(false);
          return;
        }
        
        const response = await fetch(API_CONTENT_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
       
        if (!response.ok) {
          throw new Error('Content fetch failed');
        }
        const data = await response.json();
        setContent(data.message); // Update this line based on your actual response structure
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [user]);

  const handleSignOut = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/')
  };

  return (
    <Container>
      <Header>Welcome, {user?.username} </Header>
      {loading ? (
        <Paragraph>Loading content...</Paragraph>
      ) : (
        <>
        {error ? (
          <Paragraph>Error: {error}</Paragraph>
        ) : (
          <Paragraph>{content}</Paragraph>
        )}
         <StyledButton onClick={handleSignOut}>Sign Out</StyledButton>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
