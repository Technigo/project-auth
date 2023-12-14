import { useNavigate } from "react-router-dom";
import "./pagenotfound.css";

export const PageNotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  return (
    <div className="not-found-container">
      <h1>This page does not exist.</h1>
      <button onClick={goBack} className="go-back-button">
        Go to home
      </button>
    </div>
  );
};
