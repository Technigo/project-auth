import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { user } from "../reducers/user";
import LogoutButton from "./LogoutButton";

const UserDetails = ({ SIGNUP_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionToken = localStorage.getItem("sessionToken");
  const sessionId = localStorage.getItem("sessionId");
  const sessionAlias = localStorage.getItem("sessionAlias");

  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = () => {
    fetch(`${SIGNUP_URL}/profile`, {
      method: "GET",
      headers: { Authorization: sessionToken, userId: sessionId },
    })
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line
          throw "Failed to retrieve profile";
        }
        return res.json();
      })
      .then((json) => {
        setAlias(json.alias);
        setEmail(json.email);
      })
      .catch((err) => console.error(err))
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`${SIGNUP_URL}/profile`, {
      method: "PATCH",
      body: JSON.stringify({ userId: sessionId, alias }),
      headers: { "Content-Type": "application/json", Authorization: sessionToken }
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(user.actions.setAlias({ alias: json.alias }));
      })
  };

  return (
    <section>
      <h1>Max and Sandrine's app</h1>
      {sessionToken &&
        <>
          {sessionAlias && <h3>{sessionAlias}, this is your profile page</h3>}
          {!sessionAlias && <h3>This is your profile page</h3>}
          <p>On this page, you can find your user details and update your alias.</p>
          <label>UserId:
            <input defaultValue={sessionId} disabled />
          </label>
          <label>Email:
            <input defaultValue={email} disabled />
          </label>
          <form onSubmit={handleUpdate}>
            <div className="update-field">
              <label className="update-label">
                Alias:
              <input
                  className="update-input"
                  minLength="3"
                  type="text"
                  value={alias}
                  onChange={event => setAlias(event.target.value)} />
              </label>
              <button className="update-button" type="submit">Save</button>
            </div>
            <button onClick={() => history.push("/")}>Back</button>
          </form>
          <LogoutButton />
        </>
      }
      {!sessionToken &&
        <>
          <h3>Logged out</h3>
          <p>Your session has been terminated. Please log in again.</p>
          <button onClick={() => history.push("/")}>Back to login</button>
        </>
      }
    </section>
  );
};

export default UserDetails;