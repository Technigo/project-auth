import React from "react";

import { SignOut } from "./SignOut";

export const Header = () => {
  return (
    <div className="header">
      <h1>RiddleMaster</h1>
      <SignOut />
    </div>
  );
};
