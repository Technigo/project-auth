import React from 'react';
import { Container, Header, Button } from './StyledComponents';

const Dashboard = ({ user, setToken }) => {
  const handleSignOut = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Container>
      <Header>Welcome, {user?.username}</Header>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </Container>
  );
};

export default Dashboard;
