import React, { useState, useEffect } from 'react';
import { Container, Header, StyledButton, Paragraph } from './StyledComponents';
import { useNavigate } from 'react-router-dom';

const API_CONTENT_URL = 'http://localhost:8080/api/users/content'; // Adjust the endpoint if necessary!!!

const Dashboard = ({ user, setToken }) => {
  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);

        if (!token) {
          setLoading(false);
          navigate('/'); //Redirect to login if no token is found
          return;
        }

        const authorizationHeader = `Bearer ${token}`;
        console.log('Authorization header:', authorizationHeader);

        //Handle GET request
        const getResponse = await fetch(API_CONTENT_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorizationHeader,
          },
        });
        
        //Handle POST request
        const postData = {};
        const postResponse = await fetch(API_CONTENT_URL, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorizationHeader,
          },
          body: JSON.stringify(postData),
        });

        // Process GET response
        if (getResponse.ok) {
          const getData = await getResponse.json();
          setContent(getData.userDetails ? getData.userDetails.username : '');
          setProfile(getData.userDetails);
        } else {
          throw new Error('Content fetch failed');
        }
       
        // Process POST response (example)
      if (postResponse.ok) {
        const postData = await postResponse.json();
        console.log('POST Response:', postData);
        // Process the POST response as needed
      } else {
        throw new Error('POST request failed');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  fetchContent();
}, [user, navigate]);


  const handleSignOut = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/')
  };

  return (
    <Container>
      <Header>Welcome, {user?.username}! </Header>
      {loading ? (
        <Paragraph>Hope you are having an amazing day!</Paragraph>
      ) : (
        <>
        {error ? (
          <Paragraph>Error: {error}</Paragraph>
        ) : (
          <>
          <Paragraph>Your account details:</Paragraph>
          <Paragraph>Email: {profile?.email}</Paragraph>
          <Paragraph>Username: {profile?.username}</Paragraph>
          </>
        )}
         <StyledButton onClick={handleSignOut}>Sign Out</StyledButton>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
