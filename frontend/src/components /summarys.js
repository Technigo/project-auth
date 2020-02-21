import React, { useEffect, useState } from "react";
import styled from "styled-components";

// const url = "http://localhost:5000/summary";
const url = "https://anna-sarah-auth-project.herokuapp.com/summary";

export const Summary = props => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Getting the accessToken from the browser's localStorage
  //and sending it as the header "Authorization"
  const accessToken = window.localStorage.getItem("accessToken");

  useEffect(() => {
    setErrorMessage("");
    fetch(url, {
      method: "GET",
      headers: { Authorization: accessToken }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Access denied", JSON);
        } else {
          return res.json();
        }
      })
      .then(json => setMessage(json.message))
      .catch(err => {
        setErrorMessage(err.message);
      });
  }, [accessToken]);

  return (
    <>
      <div>
        <h1>Welcome!</h1>
        <h3>You have successfully signed in!</h3>
        <h5>{message}</h5>
        <Button
          id="logout"
          className="btn"
          onClick={() => (window.location.href = "/SignIn")}
          type="button"
        >
          logout
        </Button>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 120px;
`;
