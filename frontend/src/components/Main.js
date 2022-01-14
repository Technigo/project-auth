import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import thoughts from "../reducers/thoughts";

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
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
  justify-content: center;
`;

const Joke = styled.div`
  margin: 30px;
  border: solid 2px #e55b13;
  box-shadow: 2px 2px 8px #ffd68a;
  border-radius: 50px;
  padding: 30px;
  max-width: 400px;
  color: #e55b13;
  /* text-shadow: 2px 2px #e55b13; */
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.063);
  backdrop-filter: blur(12px);
  --webkit-backdrop-filter: blur(12px);

  @media (min-width: 400px) {
    margin: 0 auto;
    max-width: 300px;
  }
`;

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
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

    fetch(API_URL("thoughts"), options)
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
  }, [accessToken, dispatch]); // For the useEffect to happen when the component gets mounted as the second argument we need to have an empty array as a dependency

  return (
    <Wrapper>
      <div>
        <Link to="/login">To '/login' !</Link>
      </div>
      <Header>insider jokes</Header>
      <SubHeader>Programmer Edition</SubHeader>
      <JokesWrapper>
        {thoughtsItems.map(
          (
            item // If we use curly brackets here we need do write return, it can be condensed by using parenthesis
          ) => (
            <Joke key={item._id}>{item.message}</Joke>
          )
        )}
      </JokesWrapper>
    </Wrapper>
  );
};

export default Main;
