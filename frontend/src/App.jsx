import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Dashboard from '../components/Dashboard';

const StyledLink = styled(Link)`
  color: #16697A;
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Nav = styled.nav`
  background-color: #82C0CC;
  padding: 10px 15px;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;

const ListItem = styled.li`
  margin: 0 10px;
`;

function App() {

  //State to hold the authentication token
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Nav>
        <List>
          {/* Home link for navigation */}
          <ListItem>
            <StyledLink to="/">Home</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/login">Login</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/register">Register</StyledLink>
          </ListItem>
        </List>
      </Nav>

      <Routes>
        <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setToken={setToken}/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
const HomeContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const HomeHeader = styled.h1`
  color: #489FB5;
`;

const HomeParagraph = styled.p`
  color: #489FB5;
`;

function Home() {
  return (
    <HomeContainer>
      <HomeHeader>Welcome to Santas little helper</HomeHeader>
      <HomeParagraph>Do you want to:</HomeParagraph>
      <div>
        <StyledLink to="/login">Login to our most excellent page</StyledLink> |{' '}
        <StyledLink to="/register">Register to access the amazing content</StyledLink>
      </div>
    </HomeContainer>
  );
}

export default App;