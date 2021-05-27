import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { API_URL } from "../reusables/urls";
import { Footer } from "../components/Footer";

import user from "../reducers/user";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-bottom: 80px;
  @media (min-width: 768px) {
    flex-direction: row;
    height: 60%;
    max-width: 75%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  @media (min-width: 1200px) {
    width: 60%;
    height: 70%;
  }
`;

const MessageContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  align-items: center;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

const StartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  background-color: #f780b1;
  @media (min-width: 768px) {
    width: 100%;
    height: 100%;
    border-bottom: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (min-width: 768px) {
    padding: 20px 0;
  }
`;

const ReceivedMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #f780b1;
  @media (min-width: 768px) {
    padding: 20px 0;
  }
`;

const MessageTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #6970f7;
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

const Message = styled.p`
  font-size: 14px;
  margin-top: 5px;
  color: #83868e;
  @media (min-width: 1200px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;

const InputMessage = styled.textarea`
  border: 2px solid #d8d8d8;
  padding: 10px;
  outline: none;
  margin-bottom: 10px;
  :focus {
    border: 2px solid #f780b1;
  }
  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

const MessageButton = styled.button`
  outline: none;
  background-color: #6970f7;
  padding: 5px 10px 3px 10px;
  font-size: 14px;
  color: white;
  border: 2px solid #6970f7;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Padauk", sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  :hover,
  :focus {
    color: #6970f7;
    background-color: #f2f3ff;
  }
`;

const Header = styled.h1`
  font-size: 22px;
  text-align: center;
  color: white;
  padding: 0 20px;
  @media (min-width: 1200px) {
    font-size: 26px;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  width: 100%;
  border-radius: 40px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #fff;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  font-family: "Padauk", sans-serif;
  letter-spacing: 1.5px;
  margin-top: 20px;
  :hover,
  :focus {
    color: #f780b1;
    background-color: #f2f3ff;
  }
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  margin-bottom: 10px;
  color: #83868e;
  padding-top: 10px;
`;

const heart = keyframes`
from { transform: translateY(-10px) }
to { transform: translateY(10px) }
`;

const Heart = styled.span`
  color: #f780b1;
  font-size: 20px;
  position: absolute;
  bottom: 5px;
  top: 0;
  left: 10px;
  right: 0;
  animation: ${heart} 1s linear infinite alternate-reverse;
`;


export const Main = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const dispatch = useDispatch();
  const history = useHistory();

  // useEffect(() => {
  //   if (!accessToken) {
  //     history.push("/");
  //   }
  // }, [accessToken, history]);

  useEffect(() => {
    fetch(API_URL("usermessage"))
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.userMessage[0].message);
      })
      .catch();
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL(mode), {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json)
      .then((message) => {
        if (message.errors) {
          console.log(message);
        } else {
          setUserMessage("");
        }
      })
      .catch();
  };

  return (
    <>
      <Container>
        <StartContainer>
          <Header>Hello, {username}. Ready for some jokes?</Header>
          <Link to="/joke">
            <Button>YES!</Button>
          </Link>
        </StartContainer>

        <MessageContainer>
          <IconContainer>
          <i class="far fa-envelope"></i>
          <Heart> <i class="fas fa-heart"></i></Heart>
          </IconContainer>
          <ReceivedMessageContainer>
            <MessageTitle>Message from previous user:</MessageTitle>
            <Message>{messages}</Message>
          </ReceivedMessageContainer>
          <Form onSubmit={handleMessageSubmit}>
            <InputMessage
              id="message"
              type="text"
              rows="3"
              placeholder="Your funny message for next user..."
              aria-multiline="true"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            ></InputMessage>
            <MessageButton type="submit" onClick={() => setMode("usermessage")}>
              send
            </MessageButton>
          </Form>
        </MessageContainer>
      </Container>
      <Footer
        footerText="Changed your mind?"
        linkText="Sign Out"
        linkTo="/signin"
        onClick={() => dispatch(user.actions.setLogOut())}
      />
    </>
  );
};
