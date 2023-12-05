import React, { useState, useEffect } from 'react';
import { Container, Header, StyledButton, Paragraph } from './StyledComponents';

const API_CONTENT_URL = 'http://localhost:8080/api/users/content'; // Adjust the endpoint if necessary!!!

const Dashboard = ({ user, setToken }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(API_CONTENT_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Content fetch failed');
        }
        const data = await response.json();
        setContent(data.message); // Update this line based on your actual response structure
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, []);

  const handleSignOut = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Container>
      <Header>Welcome, {user?.username}</Header>
      <Paragraph>{content || "Loading content..."}</Paragraph>
      <StyledButton onClick={handleSignOut}>Sign Out</StyledButton>
    </Container>
  );
};

export default Dashboard;
