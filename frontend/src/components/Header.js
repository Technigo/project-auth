import React from "react";
import { useSelector } from "react-redux";

import { SignOut } from "./SignOut";

export const Header = () => {

  const token = useSelector(state => state.users.accessToken)

  return (
    <div className="header">
      <h1>RiddleMaster</h1>
      {token && <SignOut />}
    </div>
  );
};
