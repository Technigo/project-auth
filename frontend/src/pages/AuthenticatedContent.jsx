import "./AuthenticatedContent.css";
import { userStore } from "../store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticatedContent = () => {
  const navigate = useNavigate();
  const isLoggedIn = userStore.getState().isLoggedIn;
  useEffect(() => {
    if (!isLoggedIn) {
      alert("You don't have permission to see this without being logged in.");
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      {isLoggedIn ? (
        <div className="container">
          <h2>Authenticated Content</h2>
          <p>Your secret keywords:</p>
          <code className="code-container">
            WATER, JAZZ, SKY, ZOOM, VIBE, GLOW, RAIN, SWIFT, PEARL, HAZE, JOLT,
            FLAME.
          </code>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
