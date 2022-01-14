<<<<<<< HEAD
import React, { useEffect } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

import { API_URL } from "../utils/constants"
import thoughts from "../reducers/thoughts"
import user from "reducers/user"
=======
import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import thoughts from "../reducers/thoughts";
import user from "../reducers/user";
>>>>>>> 9310488326d3a8a8886f6853d33ac7b2b7c5a352

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL("thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
        } else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null));
      dispatch(user.actions.setAccessToken(null));

      localStorage.removeItem("user");
    });
  };

  const logOutUser = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))

      localStorage.removeItem("user")
    })
  }

  return (
<<<<<<< HEAD
    <section className="secrets-container">
      <div>
        <div>
          <Link to="/login"> Back to Sign in page</Link>
        </div>
=======
    <>
      <div>
>>>>>>> 9310488326d3a8a8886f6853d33ac7b2b7c5a352
        <h1>welcome to the chamber of secrets..</h1>
        {thoughtsItems.map((item) => (
          <div key={item._id}>{item.message}</div>
        ))}
      </div>
      <button className="logout-btn" onClick={logOutUser}>
        Log out
      </button>
<<<<<<< HEAD
    </section>
  )
}

export default Main
=======
    </>
  );
};

export default Main;
>>>>>>> 9310488326d3a8a8886f6853d33ac7b2b7c5a352
