import React, { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import thoughts from "../reducers/thoughts";

import "./IndexStyle.css";

const Index = () => {
  const [message, setMessage] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const thoughtsItems = useSelector((store) => store.thoughts.items);

  const dispatch = useDispatch();
  const history = useHistory();

  const API_THOUGHTS = "https://week20-project-auth.herokuapp.com/thoughts";

  // This useEffect will check is the accessToken in the redux state is null. If it is null then the user will be sent to /login page.
  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  });

  // This useEffect will send a GET request to to the backend and the backend will send a response back with all of the thoughts that are in the database
  useEffect(() => {
    const API_THOUGHTS = "https://week20-project-auth.herokuapp.com/thoughts";
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_THOUGHTS, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          batch(() => {
            dispatch(thoughts.actions.setThoughts(data));
            dispatch(thoughts.actions.setErrors(null));
          });
        } else {
          dispatch(thoughts.actions.setErrors(data));
        }
      });
  }, [thoughtsItems, accessToken, dispatch]);

  const onButtonClick = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    };

    fetch(API_THOUGHTS, options)
      .then((res) => res.json())
      .then((data) => console.log(data));

    setMessage("");
  };

  return (
    <>
      <div className='thought-wrapper'>
        <div className='t-pink-circle'></div>
        <div className='t-blue-circle'></div>
        <div className='t-green-circle'></div>
        <form className='thought-form'>
          <textarea
            className='thought-input'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button className='thought-button' onClick={onButtonClick}>
            Send
          </button>
        </form>
        {thoughtsItems.map((thought) => (
          <div className='thought-container' key={thought._id}>
            <p>{thought.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
