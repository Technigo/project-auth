import React from "react";
import styled from 'styled-components';
import { useSelector } from "react-redux";

export const Status = () => {
  const statusMessage = useSelector((store) => store.user.login.statusMessage);

  return (
    <section class="status">
      <p>{`${statusMessage}`}</p>
    </section>
  );
};
