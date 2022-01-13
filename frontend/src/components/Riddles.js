import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { users, riddles, checkAnswer } from "../reducers/users";

export const Riddles = () => {
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
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

  const onAnswerSubmit = (event) => {
    event.preventDefault();
    dispatch(checkAnswer(token, answer))
  };

  return (
    <div className="container">
      <div className="riddle-align">
        <h3>{riddle}</h3>
        <form onSubmit={onAnswerSubmit}>
          <input
            placeholder="Answer"
            type="text"
            value={answer}
            className="input-field"
            onChange={(event) => setAnswer(event.target.value)}
          />
          <button type="submit">Answer</button>
        </form>
      </div>
    </div>
  );
};
