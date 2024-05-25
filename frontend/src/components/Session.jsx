import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { Navigate } from "react-router-dom";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "../styling/Session.css"

export const Session = () => {
  const { message, fetchLoggedInData, resetState } = useStore();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  let user = localStorage.getItem("username");
  if (user) {
    user = user.replace(/^"(.*)"$/, "$1");
  }

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("token");
    try {
      const parsedToken = JSON.parse(storedAccessToken);
      fetchLoggedInData(parsedToken);
    } catch (err) {
      setError(true);
      console.error("Error parsing token:", err);
    }
  }, [fetchLoggedInData]);

  useEffect(() => {
    if (message) {
      setText(`Welcome, ${user}! We're so happy to see you!`);
      setError(false);
    } else if (error) {
      setText(
        "The username or password is incorrect. Please try signing in again."
      );
      localStorage.clear();
      resetState();
    } else {
      setText("You are not signed in.");
    }
  }, [message, error]);

  const signOut = () => {
    localStorage.clear();
    resetState();
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="session-container">
      {message && <h1>{message}</h1>}
      <p className="session-in-text">{text}</p>
      {message && <Button className="session-in-button" onClick={signOut} btnText={"Sign out"} />}
      {!message && (
        <Link to="/">
          <Button btnText={"Back to Login"} />
        </Link>
      )}
    </div>
  );
};
