import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { user } from "../reducers/user";

import LogoutButton from "./LogoutButton";

const UserDetails = ({ SIGNUP_URL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userId = useSelector((store) => store.user.login.userId);
  const currentAlias = useSelector((store) => store.user.login.alias);

  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = () => {
    fetch(`${SIGNUP_URL}/${userId}/profile`, {
      method: "GET",
      headers: { Authorization: accessToken },
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
    fetch(`${SIGNUP_URL}/${userId}/profile`, {
      method: "POST",
      body: JSON.stringify({ alias }),
      headers: { "Content-Type": "application/json", Authorization: accessToken }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch(user.actions.setAlias({ alias: json.alias }));
      })
  };

  return (
    <section>
      <h1>Max and Sandrine's app</h1>
      {accessToken &&
        <>
          {currentAlias && <h3>{currentAlias}, this is your profile page</h3>}
          {!currentAlias && <h3>This is your profile page</h3>}
          <p>On this page, you can find your user details and update your alias.</p>
          <label>UserId:
            <input defaultValue={userId} disabled />
          </label>
          <label>Email:
            <input defaultValue={email} disabled />
          </label>
          <form onSubmit={handleUpdate}>
            <div>
              <label>
                Alias:
              <input
                  minLength="3"
                  type="text"
                  value={alias}
                  onChange={event => setAlias(event.target.value)} />
              </label>
              <button type="submit">Update</button>
            </div>
          </form>
          <button onClick={() => history.push("/")}>Back</button>
          <LogoutButton />
        </>
      }
      {!accessToken &&
        <>
          <h3>Logged out</h3>
          <p>Your session has been terminated. Please log in again.</p>
          <button onClick={() => history.push("/")}>Back to login</button>
        </>
      }
    </section>
  )
};

export default UserDetails;