import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Navigate } from "react-router-dom";
import { Button } from "./Button";
import { Link } from "react-router-dom";

export const Session = () => {
  const { message, fetchLoggedInData, resetState } = useStore();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("token");
    if (storedAccessToken === null) {
      console.log("this should redirect to login page");
      setShouldRedirect(true);
    } else {
      try {
        const parsedToken = JSON.parse(storedAccessToken);
        console.log("Parsed token:", parsedToken);
        fetchLoggedInData(parsedToken);
      } catch (error) {
        console.error("Error parsing token:", error);
        setShouldRedirect(true);
      }
    }
  }, [fetchLoggedInData]);

  const signOut = () => {
    localStorage.clear();
    resetState();
  };

  useEffect(() => {
    if (message) {
      setText(`Welcome! We're so happy to see you!`);
    } else {
      setText("You are not signed in.");
    }
  }, [message]);

  if (shouldRedirect) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      {text}
      {message && <Button onClick={signOut} btnText={"Sign out"} />}
      {!message && (
        <Link to="/">
          <Button btnText={"Back to Login"} />
        </Link>
      )}
    </div>
  );
};
