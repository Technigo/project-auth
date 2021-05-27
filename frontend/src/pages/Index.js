import React, { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import user from "../reducers/user";
import thoughts from "../reducers/thoughts";

import "./IndexStyle.css";

const Index = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const thoughtsItems = useSelector((store) => store.thoughts.items);

  const dispatch = useDispatch();
  const history = useHistory();

  // This useEffect will check is the accessToken in the redux state is null. If it is null then the user will be sent to /login page.
  // useEffect(() => {
  //   if (!accessToken) {
  //     history.push("/login");
  //   }
  // });

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
        console.log(data);
        if (data) {
          batch(() => {
            dispatch(thoughts.actions.setThoughts(data));
            dispatch(thoughts.actions.setErrors(null));
          });
        } else {
          dispatch(thoughts.actions.setErrors(data));
        }
      });
  }, [accessToken]);
  return (
    <>
      <div className='thought-wrapper'>
        {thoughtsItems.map((thought) => (
          <div classname='thought-container' key={thought._id}>
            <p>{thought.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
