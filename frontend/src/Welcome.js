import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Welcome = () => {
  const [message, setMessage] = useState(false);
  let history = useHistory();
  const accessToken = window.localStorage.getItem("accessToken");

  //Authorization of the logged in user via accessToken and sending out the secret
  useEffect(() => {
    fetch("http://localhost:8080/secrets", {
      method: "GET",
      headers: { Authorization: accessToken }
    })
      .then(res => {
        if (!res.ok) {
          // !TODO: Handle status 401 and show error message.
        }
        return res.json();
      })
      .then(json => setMessage(json.secret));
  }, []);

  //LOG OUT
  const handleLogOut = () => {
    window.localStorage.removeItem("accessToken");
    history.push("/login");
  };

  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>
      <div>{message}</div>
    </div>
  );
};

//Nice to have username, add also in backend.
