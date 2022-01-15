import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import background from "images/background.jpg";
import "./Main.css";
import { API_URL } from "utils/constants";
import secrets from "reducer/secrets";
import user from "../reducer/user";

export const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken
      }
    };

    fetch(API_URL("secrets"), options)

      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(secrets.actions.setSecretsItems(data.response));
          dispatch(secrets.actions.setError(null));
        } else {
          dispatch(secrets.actions.setSecretsItems([]));
          dispatch(secrets.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  

  const onClick = (event) => {
    event.preventDefault();   
   dispatch(user.actions.setAccessToken(null));    
  };

  return (
    <article className="mainContainer">
      <section className="imgContainer">
        <img src={background} alt="background" aria-hidden="true"/>
      </section>
      <section className="mainContent">
        <h1>Welcome in to our secret little world!</h1>
        <section className="btnContainerMain">
          <button onClick={onClick} type="button">
            {" "}
            Log out
          </button>
        </section>
      </section>
    </article>
  );
};
