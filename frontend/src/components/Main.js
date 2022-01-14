import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import jokes from "../reducers/jokes";

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  @media (min-width: 768px) {
    min-height: 100vh;
  }
`;

const Container = styled.div`
  @media (min-width: 1024px) {
    height: 80%;
  }
`;

const Header = styled.h1`
  color: #e55b13;
  font-family: "Eater", cursive;
  font-size: 75px;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 10px;
  text-shadow: 4px 4px #ffd68a;
`;

const SubHeader = styled.p`
  color: #ffd68a;
  font-size: 30px;
  text-align: center;
  text-transform: capitalize;
  font-family: "Eater", cursive;
  margin-top: 0px;
  text-shadow: 4px 4px #e55b13;
`;

const JokesWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    margin-top: 80px;
  }
`;

const Joke = styled.div`
  margin: 30px;
  border: solid 2px #e55b13;
  box-shadow: 2px 2px 8px #ffd68a;
  border-radius: 50px;
  padding: 30px;
  max-width: 400px;
  color: #e55b13;
  font-family: "Source Code Pro", monospace;
  /* text-shadow: 2px 2px #e55b13; */
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.063);
  backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);

  @media (min-width: 400px) {
    max-width: 300px;
  }
`;

const Main = () => {
  const jokesItems = useSelector((store) => store.jokes.items);
  const accessToken = useSelector((store) => store.user.accessToken); // getting accessToken from reducer to send it back to backend when trying to log in

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if the user is not signed in, navigate to the login page
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken, // sending accessToken to backend to log in
      },
    };

    fetch(API_URL("jokes"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(jokes.actions.setItems(data.response));
          dispatch(jokes.actions.setError(null));
        } else {
          dispatch(jokes.actions.setItems([]));
          dispatch(jokes.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]); // For the useEffect to happen when the component gets mounted as the second argument we need to have an empty array as a dependency

  return (
    <Wrapper>
      <Container>
        <Header>insider jokes</Header>
        <SubHeader>Programmer Edition</SubHeader>
        <JokesWrapper>
          {jokesItems.map(
            (
              item // If we use curly brackets here we need do write return, it can be condensed by using parenthesis
            ) => (
              <Joke key={item._id}>{item.message}</Joke>
            )
          )}
        </JokesWrapper>
      </Container>
    </Wrapper>
  );
};

/* <div>
        <Link to="/login">To '/login' !</Link>
      </div> */

export default Main;
