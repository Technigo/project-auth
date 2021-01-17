import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { user } from "user";
import {
  Button,
  MainContainer,
  Header,
  Headline,
} from "./Styling/StyledComponents";

const AUTH_URL =
  "https://project-auth-joel-cornelia.herokuapp.com/authentication";

const Profile = () => {
  const [name, setName] = useState("");
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(user.actions.logOut());
  };

  fetch(AUTH_URL, {
    method: "GET",
    headers: { Authorization: `${accessToken}` },
  })
    .then((response) => response.json())
    .then((json) => {
      setName(json.name);
    });

  return (
    <>
      <MainContainer>
        <Header>
          <Headline>Welcome {name} you are logged in!</Headline>
        </Header>
        <Button onClick={handleLogOut}>Log Out</Button>
      </MainContainer>
    </>
  );
};

export default Profile;
