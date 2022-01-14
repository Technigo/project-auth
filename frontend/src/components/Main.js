import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import user from "../reducers/user";

const Background = styled.div`
  background: linear-gradient(
    to bottom right,
    rgb(0, 0, 0) 0%,
    rgb(50, 50, 50) 100%
  );
  display: flex;
  justify-content: center;
  padding-top: 20px;
  color: white;

  h1 {
    text-align: center;
    color: white;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 97vw;
  padding: 10px 20px;

  a {
    color: white;
  }

  button {
    margin: 20px 3px;
    padding: 10px;
    border-radius: 50px;
    border: 1px solid white;
    color: white;
    background: black;
    width: 100px;
  }

  button:hover {
    background: white;
    color: black;
    transition: 0.2s;
    cursor: pointer;
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    padding: 10px;
    border: none;
    border-radius: 6px;
    margin: 5px;
  }

  textarea {
    padding: 10px;
    border: none;
    border-radius: 6px;
    margin: 5px;
    width: 250px;
    height: 70px;
  }

  label {
    color: white;
    margin: 15px;
    font-weight: bold;
  }

  button {
    margin: 20px 3px;
    padding: 10px;
    border-radius: 50px;
    border: 1px solid white;
    color: white;
    background: black;
    width: 70px;
  }

  button:hover {
    background: white;
    color: black;
    transition: 0.2s;
    cursor: pointer;
  }
`;

const ThoughtCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  border: 2px solid white;
  margin: 15px;
  border-radius: 20px;
  background: black;
  box-shadow: 5px 5px 10px #424242;
  padding: 10px 30px;
`;

const ThoughtList = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ThoughtMessage = styled.p`
  font-size: 20px;
`;
const ThoughtTime = styled.p`
  font-size: 10px;
`;

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);

  const [thoughts, setThoughts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newThought, setNewThought] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const THOUGHTS_URL = `https://intehon-happy-thoughts.herokuapp.com/thoughts`;

  const logout = () => {
    dispatch(user.actions.setAccessToken(""));
  };


  // useEffect(() => {
  //   fetch(THOUGHTS_URL)
  //     .then((res) => res.json())
  //     .then((data) => setThoughts(data));
  // }, []);


  useEffect(() => {
    fetchThoughts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchThoughts = () => {
    fetch(THOUGHTS_URL)
      .then((res) => res.json())
      .then((data) => setThoughts(data.response));
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ name: newName, message: newThought }),
    };

    fetch(THOUGHTS_URL, options)
      .then((res) => res.json())
      .then((data) => {
        fetchThoughts()
      });

    setNewThought("");
    setNewName("");
  };

  return (
    <Background>
      <div>
        <HeaderBox>
          <button onClick={logout}>Sign out!</button>
        </HeaderBox>
        <h1>Protected happy thoughts:</h1>
        <FormBox>
          <label htmlFor="newThought">What's on your mind?</label>
          <textarea
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            maxLength={145}
          />
          <label id="newName" htmlFor="newName">
            What's your name? <span className="optional-text">(optional)</span>
          </label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="thought-button" onClick={onFormSubmit}>
            Send
          </button>
        </FormBox>
        <ThoughtList>
          {thoughts.map((thought) => (
            <ThoughtCard key={thought._id}>
              <ThoughtMessage>{thought.message}</ThoughtMessage>
              
                {thought.name ? <p><i>- {thought.name}</i></p> : ""}
             
              <ThoughtTime>{moment(thought.createdAt).fromNow()}</ThoughtTime>
            </ThoughtCard>
          ))}
        </ThoughtList>
      </div>
    </Background>
  );
};

export default Main;
