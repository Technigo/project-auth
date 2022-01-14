import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { riddles, checkAnswer } from "../reducers/users";

export const Riddles = () => {
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.users.accessToken);
  const riddle = useSelector((state) => state.users.riddle);
  const riddleAnswer = useSelector((state) => state.users.answer);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const getRiddles = () => {
    dispatch(riddles(token));
  };
  useEffect(() => {
    getRiddles();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   const getRiddles = () => {
  //     dispatch(riddles(token));
  //   };
  //   getRiddles();
  // }, []);

  const delayRiddle = useMemo(() => {
    setTimeout(() => riddle, 2000);
    return riddle;
  }, [riddle]);

  const onAnswerSubmit = (event) => {
    event.preventDefault();
    dispatch(checkAnswer(token, answer));
    setTimeout(() => setShowAnswer(false), 2000);
    setAnswer("");
  };

  return (
    <div className="container">
      <div className="riddle-align">
        <h3>{delayRiddle}</h3>
        <form onSubmit={onAnswerSubmit} className="riddle-form">
          <input
            placeholder="Answer"
            type="text"
            value={answer}
            className="input-field"
            onChange={(event) => setAnswer(event.target.value)}
          />
          <button type="submit">Answer</button>
          {riddleAnswer && showAnswer && riddleAnswer.toString() === "true" && (
            <p>Correct</p>
          )}

          {riddleAnswer &&
            showAnswer &&
            riddleAnswer.toString() === "false" && <p>Incorrect</p>}
        </form>
      </div>
    </div>
  );
};
