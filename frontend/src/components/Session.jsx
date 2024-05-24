import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Navigate } from "react-router-dom";

export const Session = () => {
  const { message, fetchLoggedInData, accessToken } = useStore();
  const [shouldRedirect, setShouldRedirect] = useState();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("token");
    if (storedAccessToken === null) {
      console.log("this should redirect to login page");
      setShouldRedirect(true);
    } else {
      fetchLoggedInData(storedAccessToken);
    }
  }, []);

  if (shouldRedirect) {
    return <Navigate replace to="/" />;
  }

  return <div>Session: You are logged in. {message && <p>{message}</p>}</div>;
};
