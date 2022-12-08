import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components/macro";
import tree from "../assets/tree.png";
import { GreetingsInput } from "./GreetingsInput";

const Main = () => {
  const thoughtItems = useSelector((store) => store.thoughts.items);
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
  }, []);

  return (
    <>
      <button type="button" onClick={() => window.location.reload()}>
        Log out
      </button>
      <GreetingsInput />
      <h2>👇🏼 Post Christmas feelings here 👇🏼</h2>
      {thoughtItems.map((item) => {
        return (
          <ChristmasCard key={item._id}>
            <TreeImg src={tree} alt="Christmas tree" />
            <SenderInfo>
              <p>To: </p>
              <p>From: {item.name}</p>
            </SenderInfo>
            <p>{item.message}</p>
          </ChristmasCard>
        );
      })}
    </>
  );
};

export default Main;

const ChristmasCard = styled.div`
  background-color: var(--white);
  color: var(--red);
  width: 85vw;
  height: 10rem;
  display: flex;
  flex-direction: column;

  align-items: center;
  padding: 1rem;
  margin: 1rem;
  position: relative;
`;

const TreeImg = styled.img`
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  rotate: -30deg;
`;

const SenderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65%;
  position: absolute;
  right: 1rem;
`;
