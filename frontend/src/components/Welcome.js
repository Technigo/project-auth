import React, { useEffect } from "react";
import { useSelector, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_URL } from "utils/utils";
import user from "reducers/user";

export const Welcome = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const secretMessage = useSelector((store) => store.user.secretMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };

      fetch(API_URL("secret"), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setSecretMessage(data.secretMessage));
              dispatch(user.actions.setError(null));
            });
          } else {
            dispatch(user.actions.setError(data.response));
          }
        });
    }
  }, [accessToken, dispatch]);

  return (
    <>
      <div className="links"></div>
      <section className="welcome-box">
        <h2>YESSS!</h2>
        <p>{secretMessage}</p>
        <div>
          <button
            className="button"
            type="button"
            onClick={() => dispatch(user.actions.setAccessToken(null))}
          >
            Log out
          </button>
        </div>
      </section>
    </>
  );
};
