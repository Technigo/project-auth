import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Navigate } from "react-router-dom";

export const Session = () => {
  const [shouldRedirect, setShouldRedirect] = useState();

  //const { fetchLoggedInData, accessToken, message, checkAccessToken } = useStore();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("token");
    if (storedAccessToken === null) {
      console.log("this should redirect to login page");
      setShouldRedirect(true);
    } else {
      console.log("access token exists");
    }
    // if (storedAccessToken) {
    //   console.log("if");
    //   fetchLoggedInData(accessToken);
    // } else {
    //   console.log("else");
    // }
  }, []);

  if (shouldRedirect) {
    return <Navigate replace to="/" />;
  }

  return <div>Session: You are logged in. </div>;
};

/*
   useEffect(() => {
    const storedAccessToken = localStorage.getItem("token");
    if (storedAccessToken === null) {
      console.log("Redirecting...");
      history.push("/"); // Redirect to the specified route
    } else {
      console.log("Access token exists");
    }
  }, [history]);
   */
