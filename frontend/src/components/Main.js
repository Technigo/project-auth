import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import thoughts from "reducers/thoughts";
import { API_URL } from "reusable/url";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      history.push("./login");
    }
  }, [accessToken, history]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      };

      fetch(API_URL("thoughts"), options)
        .then((res) => res.json())
        .then((data) => dispatch(thoughts.actions.setThoughts(data)));
    }
  }, [accessToken, dispatch]);

  return (
    <div>
      main
      <Link to="/login">Login</Link>
      {thoughtsItems &&
        thoughtsItems.map((thought) => (
          <p key={thought._id}>{thought.message}</p>
        ))}
    </div>
  );
};

export default Main;
