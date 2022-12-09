import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import greetings from "reducers/greetings";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components/macro";
import tree from "../assets/tree.png";
import { GreetingsInput } from "./GreetingsInput";
import user from "reducers/user";


const Main = () => {
  const greetingItems = useSelector((store) => store.greetings.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };
    fetch(API_URL("greetings"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(greetings.actions.setItems(data.response));
          dispatch(greetings.actions.setError(null));
        } else {
          dispatch(greetings.actions.setItems([]));
          dispatch(greetings.actions.setError(data.response));
        }
      });
  }, []);

  return (
    <>
      <button type="button" onClick={() => dispatch(user.actions.setAccessToken(null))}>Sign Out</button>
      <h2>👇🏼 Post Christmas Greetings Here 👇🏼</h2>
      <GreetingsInput />
      <Feed>
        {greetingItems.map((item) => {
          return (
              <ChristmasCard key={item._id}>
                <TreeImg src={tree} alt="Christmas tree" />
                <SenderInfo>
                  <p>To: {item.receiver}</p>
                  {/* <p>From: {item.name}</p> */}
                </SenderInfo>
                <Greeting>{item.message}</Greeting>
              </ChristmasCard>
    
          );
        })}
      </Feed>
    </>
  );
};

export default Main;

const Feed = styled.section`
overflow-y: scroll;
height: 70vh;
padding: 0.5rem;
margin-top: 1rem;

@media (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90vw;
    gap: 1rem;
  };

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }
`

const ChristmasCard = styled.div`
  background-color: var(--white);
  color: var(--red);
  width: 85vw;
  max-width: 400px;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
  border: double 0.2rem;

  @media (min-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;

const TreeImg = styled.img`
  position: absolute;
  top: -0.8rem;
  left: -0.75rem;
  rotate: -20deg;
  width: 5rem;
`;

const SenderInfo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  position: absolute;
  right: 1rem;

  @media (min-width: 600px) {
    position: static;
  }
`;

const Greeting = styled.p`
  margin: auto
`
