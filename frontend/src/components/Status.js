import React from "react";
import { useSelector } from "react-redux";

//Vans code
export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  return (
    <section class="status">
      <p>{`${statusMessage}`}</p>
    </section>
  );
};
