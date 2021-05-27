import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import user from "../reducers/user";
import { API_URL } from "../reusables/urls";
import { Footer } from "../components/Footer";
import { 
  Container, 
  StartContainer, 
  Header, 
  Button, 
  MessageContainer, 
  ReceivedMessageContainer, 
  IconContainer, 
  Heart, 
  MessageTitle, 
  Message, 
  Form, 
  InputMessage, 
  MessageButton } from '../components/StylingPages';


export const Main = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);

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
          <Heart><i class="fas fa-heart"></i></Heart>
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
