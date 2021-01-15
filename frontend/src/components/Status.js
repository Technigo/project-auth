import React from "react";
import { useSelector } from "react-redux";

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  return (
    <section className="status">
      <p>{`${statusMessage}`}</p>
      <h1>hello</h1>
    </section>
  );
};
