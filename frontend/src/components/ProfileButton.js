import React from "react";
import { useHistory } from "react-router-dom";

const ProfileButton = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.push("/userdetails")}>Profile</button>
  );
};

export default ProfileButton;