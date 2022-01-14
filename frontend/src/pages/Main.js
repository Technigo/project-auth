import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/urls";
import secrets from "../reducers/secrets";
import user from "../reducers/user";
import { YodaAnimation } from "components/YodaAnimation";

const Main = () => {
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

    fetch(API_URL("secrets"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(secrets.actions.setItems(data.response));
          dispatch(secrets.actions.setError(null));
        } else {
          dispatch(secrets.actions.setItems([]));
          dispatch(secrets.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  return (
    <>
      <section className="animation-button-container">
        <div className="animation">
          <YodaAnimation />
        </div>
        <button
          className="logout"
          type="button"
          onClick={() => dispatch(user.actions.setAccessToken(null))}
        >
          Log Out
        </button>
      </section>
    </>
  );
};

export default Main;
