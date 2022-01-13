import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

// import { API_URL } from "../utils/constants";
// import thoughts from "../reducers/thoughts";
import user from "../reducers/user";

const Background = styled.div`
  background: linear-gradient(
    to bottom right,
    rgb(0, 0, 0) 0%,
    rgb(50, 50, 50) 100%
  );
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 20px;

  h1 {
    text-align: center;
    color: white;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const Main = () => {
  // const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const [thoughts, setThoughts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newThought, setNewThought] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const THOUGHTS_URL = `https://intehon-happy-thoughts.herokuapp.com/thoughts`

  const logout = () => {
    // event.preventDefault()
    dispatch(user.actions.setAccessToken(""));
    // localStorage.clear()
  };

  useEffect(() => {
    fetchThoughts()
  })

  const fetchThoughts = () => {
    fetch(THOUGHTS_URL)
    .then((res) => res.json())
    .then((data) => setThoughts(data.response))
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Authorization: accessToken,
  //     },
  //   };
  //   fetch(THOUGHTS_URL, options)
  //     .then((res) => res.json)
  //     .then((data) => {
  //       if (data.success) {
  //         dispatch(thoughts.actions.setItems(data.response));
  //         dispatch(thoughts.actions.setError(null));
  //       } else {
  //         dispatch(thoughts.actions.setError(data.response));
  //         dispatch(thoughts.actions.setItems([]));
  //       }
  //     });
  // }, [accessToken, dispatch, message]);

  const onFormSubmit = (e) => {
    e.preventDefault()
    
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken
      },
      body: JSON.stringify({ name: newName, message: newThought })
    }

    fetch(THOUGHTS_URL, options)
    .then((res) => res.json())
    .then((data) => {
      fetchThoughts()
    })

    setNewThought('')
    setNewName('')
  }

  return (
    <Background>
      <div>
        <HeaderBox>
          <Link to="/login">To '/login'!</Link>
          <button onClick={logout}>Sign out!</button>
        </HeaderBox>
        <h1>Protected happy thoughts:</h1>
        <form>
        <label 
          id='newName'
          htmlFor='newName'>What's your name? <span className="optional-text">(optional)</span></label>
          <input 
          type="text" 
          id="name"
          value={newName} 
          onChange={(e) => setNewName(e.target.value)}/>
          <label htmlFor='newThought'>What's on your mind?</label>
          <textarea
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            maxLength={145}
          />
          <button className="thought-button" onClick={onFormSubmit}>
            Send
          </button>
        </form>
        {thoughts.map((thought) => (
          <div key={thought._id}>
            <p>{thought.name}</p>
            <p>{thought.message}</p>
            </div>
        ))}
      </div>
    </Background>
  );
};

export default Main;
