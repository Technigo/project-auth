import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { API_URL } from '../utils/constant';
import thoughts from '../reducers/thoughts';
import user from '../reducers/user';
import img from '../assets/background.jpeg';

//--------styling------------------//

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${img});
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding-top:20px;
    overflow: scroll;
  }`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  margin: 0;

  cursor: pointer;
  width: 200px;
  border-radius: 4px;
  background-color: #505168;
  border: none;
  padding: 10px 15px;
  transition-duration: 0.4s;
  overflow: hidden;

  &:hover {
    background: #fff;
    box-shadow: 0px 2px 10px 5px #97b1bf;
    color: #000;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const TitleText = styled.h1`
  line-height: 4rem;
  font-family: 'Rosarivo', serif;
  font-size: 2.88rem;
  margin: 0;
  padding: 0 24px;
  color: white;
`;

const ThoughtContainer = styled.div`
  height: auto;
  width: 25rem;
  background-color: #e5dccd;
  font-weight: 400;
  font-style: normal;
  box-shadow: -4px 4px 2px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  margin: 10px 0;
`;

const ThoughtText = styled.p`
  line-height: 1.5rem;
  font-family: 'Rosarivo', serif;
  font-size: 1.3rem;
  margin: 1rem 0;
  padding: 16px 24px;
`;
//--------------------------------------//

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));
    });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL('thoughts'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
        } else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  return (
    <>
      <GlobalStyle />

      <div>
        <StyledLink to="/" onClick={onLogout}>
          {' '}
          Log out{' '}
        </StyledLink>
      </div>
      <Content>
        <TitleText>Welcome! Now lets be happy!!:</TitleText>
        {thoughtsItems.map((item) => (
          <ThoughtContainer key={item._id}>
            <ThoughtText>{item.message}</ThoughtText>
          </ThoughtContainer>
        ))}
      </Content>
    </>
  );
};

export default Main;
