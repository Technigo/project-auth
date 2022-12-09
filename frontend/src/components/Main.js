import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/utils";

const Main = () => {
  // Access to all thoughts from the store
  // fetching all thoughts by useEffect. set thought item to fetch thoughts
  const thoughtsItem = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useNavigate 
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Autorization": accessToken
      },
    }
    fetch(API_URL("thoughts"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
          // Set Error to initial state which it is null
        }
        // set action to initial state which it is []
        else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  }, []);

  return (
    <>
      <Link to="/login">LOGIN</Link>
      <h2>This is a main componenet</h2>
      {thoughtsItem.map((item) => {
        return <p key={item._id}>{item.message}</p>;
      })}
    </>
  );
};

export default Main;
