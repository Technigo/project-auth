import React, { useState } from "react";
import { useSelector } from "react-redux";

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  return (
    <section>
      <p>{`${statusMessage}`}</p>
    </section>
  );
};
