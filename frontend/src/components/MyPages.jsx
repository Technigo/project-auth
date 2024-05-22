import React from "react";

export const MyPages = ({ user }) => {
  return (
    <div className="container">
      <h1>Welcome, {user.name}</h1>
      <p>This is your personal page.</p>
    </div>
  );
};
