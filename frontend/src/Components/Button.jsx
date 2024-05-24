import PropTypes from "prop-types";

export const Button = ({ action, setFormSelect }) => {
  const handleSignUp = () => {
    console.log("Sign up:", action);
  };

  const handleSignIn = () => {
    console.log("Log in:", action);
  };

  const handleClick = (event) => {
    setFormSelect(action);
    if (action === "Sign Up") {
      handleSignUp(event);
    }
    if (action === "Log In") {
      handleSignIn(event);
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
  setFormSelect: PropTypes.string,
};
