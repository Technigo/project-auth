import "./MainSection.css";
import { Form } from "./Components/Form";
import PropTypes from "prop-types";

export const MainSection = ({ formSelect }) => {
  console.log("Inside Main:", formSelect);

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
        {showLogin ? (
          <>
            <h2>
              Welcome Back! <br />
              Please log in here:
            </h2>
            <Form action={"Log In"} />
          </>
        ) : (
          <>
            <h2>
              Welcome to our Authentication Site. <br />
              Please sign up here:
            </h2>
            <Form action={"Sign Up"} />
          </>
        )}
      </section>
    </>
  );
};

MainSection.propTypes = {
  formSelect: PropTypes.string,
};
