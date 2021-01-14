import React from "react";
import { useSelector } from "react-redux";

import DetailsButton from "./DetailsButton";

const StartPage = ({ SIGNUP_URL }) => {
  const userId = useSelector((store) => store.user.login.userId)
  return (
    <section>
      <h1>Max and Sandrine's app</h1>
      <p>You are successfully logged in as member {userId}!</p>
      <DetailsButton SIGNUP_URL={SIGNUP_URL} />
    </section>
  )
};

export default StartPage