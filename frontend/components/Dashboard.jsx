import React, { useState, useEffect } from 'react';
import { Container, Header, StyledButton, Paragraph } from './StyledComponents';
import { useNavigate } from 'react-router-dom';

const API_CONTENT_URL = 'http://localhost:8080/api/users/content'; // Adjust the endpoint if necessary!!!

const Dashboard = ({ user, setToken }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token)
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
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSignOut = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/')
  };

  return (
    <Container>
      <Header>
        {loading ? 'Loading...' : `Welcome, ${user?.username || 'Guest'}`}
      </Header>
      {!loading && (
        <>
      <Paragraph>{content || "Loading content..."}</Paragraph>
      <StyledButton onClick={handleSignOut}>Sign Out</StyledButton>
      </>
     )}
    </Container>
  );
};

export default Dashboard;
