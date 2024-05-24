import "./MainSection.css";
import { Form } from "./Components/Form";
import PropTypes from "prop-types";
import { useState } from "react";

export const MainSection = ({
  formSelect,
  isLoggedIn,
  setIsLoggedIn,
  isRegistered,
  setIsRegistered,
}) => {
  const [username, setUsername] = useState("");

  let showLogin = false;
  if (formSelect === "Log In") {
    showLogin = true;
  } else {
    showLogin = false;
  }

  const verifyAccessToken = () => {
    // Function to retrieve the access token from local storage
    const getAccessToken = () => {
      // const token = localStorage.getItem("access_token");
      return localStorage.getItem("access_token");
    };

    const accessToken = getAccessToken();
    if (accessToken && accessToken.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // Call the function to verify the access token
  verifyAccessToken();

  return (
    <>
      <section className="main">
        {isLoggedIn ? (
          "Logged in! "
        ) : showLogin ? (
          <>
            <h2>
              Welcome Back! <br />
              Please log in here:
            </h2>
            <Form
              action={"Log In"}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
              username={username}
              setUsername={setUsername}
            />
          </>
        ) : (
          <>
            <h2>
              Welcome to our Authentication Site. <br />
              Please sign up here:
            </h2>
            <Form
              action={"Sign Up"}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
              username={username}
              setUsername={setUsername}
            />
          </>
        )}
      </section>
    </>
  );
};

MainSection.propTypes = {
  formSelect: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
  isRegistered: PropTypes.bool,
  setIsRegistered: PropTypes.func,
};
