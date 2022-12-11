import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";
import user from "reducers/user";
import styled from "styled-components";

const Main = () => {
  // Access to all thoughts from the store
  // fetching all thoughts by useEffect. set thought item to fetch thoughts
  const thoughtsItem = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useNavigate
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
        Autorization: accessToken,
      },
    };
    fetch(API_URL("thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
          // Set Error to initial state which it is null
        }
        // set action to initial state which it is []
        else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  }, []);

  return (
    <Wrapper>
      {/* <Link to="/login">LOGIN</Link> */}
      <Text>
        <h2>💜 All Happy Thoughts 💜 </h2>
      </Text>
      {thoughtsItem.map((item) => {
        return (
          <Textsub>
            <h4 key={item._id}>{item.message}</h4>
          </Textsub>
        );
      })}
      <Button
        type="button"
        onClick={() => {
          dispatch(user.actions.setAccessToken(null));
          //   navigate("/login");
        }}
      >
        Log Out
      </Button>
    </Wrapper>
  );
};

export default Main;

/**stying */
const Wrapper = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  background-color: rgb(230, 179, 255);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  font-family: "Inconsolata";
  padding: 6px 15px;
  font-weight: bold;
  font-size: 17px;
  background: none;
  border: 4px solid rgb(102, 0, 102);
  width: 150px;
  margin: 15px 30px 30px;
  cursor: pointer;
  color: rgb(26, 0, 26);
  border-radius: 8px;
`;

const Text = styled.h2`
  margin-top: 20px;
  font-size: 18px;
  color: beige;
`;
const Textsub = styled.h4`
  margin-top: 20px;
  font-size: 18px;
  color: beige;
`;