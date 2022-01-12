import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { riddles } from "../reducers/users";

export const Riddles = () => {
  let navigate = useNavigate();
  const token = useSelector((state) => state.users.accessToken);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  const dispatch = useDispatch();
  console.log(token);
  const getRiddles = () => {
    dispatch(riddles(token));
  };

  return (
    <>
      <button onClick={getRiddles}>This is the riddles</button>
    </>
  );
};
