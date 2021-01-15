import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from "user";

const Profile = () => {
  const [name, setName] = useState("");
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(user.actions.logOut());
  };
  console.log(accessToken);

  fetch("http://localhost:8080/authentication", {
    method: "GET",
    headers: { Authorization: `${accessToken}` },
  })
    .then((response) => response.json())
    .then((json) => {
      setName(json.name);
    });

  return (
    <>
      <div>
        <h1>Welcome {name} you are logged in!</h1>
      </div>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
};

export default Profile;
