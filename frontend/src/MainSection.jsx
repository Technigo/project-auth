import "./MainSection.css";
import { Form } from "./Components/Form";
import PropTypes from "prop-types";
import { useState } from "react";
import { VerifyAccessToken } from "./Components/verifyAccessToken";

export const MainSection = ({
  formSelect,
  isLoggedIn,
  setIsLoggedIn,
  isRegistered,
  setIsRegistered,
}) => {
  console.log("Inside Main:", formSelect);

  const [username, setUsername] = useState("");

  let showLogin = false;
  if (formSelect === "Log In") {
    showLogin = true;
  } else {
    showLogin = false;
  }


  console.log("Show Login inside main:", showLogin);

  return (
    <>
      <section className="main">
        {/* {localStorage.getItem("access_token") ? `Hej ${username}` : "not Hej"} */}
        <VerifyAccessToken
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        /> 
        {showLogin ? (
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
