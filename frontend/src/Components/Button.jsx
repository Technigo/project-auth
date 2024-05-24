import PropTypes from "prop-types";

export const Button = ({ action, setFormSelect, setIsRegistered }) => {
  const handleSignUp = () => {
    console.log("Sign up:", action);
  };

  const handleSignIn = () => {
    console.log("Log in:", action);
  };

  const handleClick = (event) => {
    setIsRegistered(false);

    setFormSelect(action);
    if (action === "Sign Up") {
      handleSignUp(event);
    }
    if (action === "Log In") {
      handleSignIn(event);
    }
    if (action === "Log Out") {
      localStorage.clear();
      console.log("Cleared Acces token:", localStorage.getItem("access_token"));
    }
  };

  return (
    <>
      <button className="buttonstyle" onClick={handleClick}>
        {action}
      </button>
    </>
  );
};

Button.propTypes = {
  action: PropTypes.string,
  setFormSelect: PropTypes.func,
  setIsRegistered: PropTypes.func,
};
