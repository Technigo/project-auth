import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import user from "reducers/user";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  return (
    <>
      <h1>Welcome!</h1>
      <button
        type="button"
        onClick={() => {
          navigate("/login");
          dispatch(user.actions.setAccessToken(null));
        }}
      >
        Log out
      </button>
    </>
  );
};

export default Main;