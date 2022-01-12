import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { users, riddles } from "../reducers/users";

export const Riddles = () => {
  const [answer, setAnswer] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.users.accessToken);
  const riddle = useSelector((state) => state.users.riddle);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    getRiddles();
  }, []);

  const getRiddles = () => {
    dispatch(riddles(token));
  };

  const onSignOut = () => {
    dispatch(users.actions.setUserToLoggedOut());
  };
  const onAnswerSumbit = (event) => {
    event.preventDefault();
    // dispatch();
  };

  return (
    <>
      <button onClick={onSignOut}>Sign out</button>
      <h1>{riddle}</h1>
      <p>Answer</p>
      <form onSubmit={onAnswerSumbit}>
        <input
          placeholder="Answer"
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <button type="submit">Answer</button>
      </form>
    </>
  );
};
