import PropTypes from "prop-types";

export const Button = ({ action }) => {
  const handleSignUp = () => {
    console.log("Sign up:", action);
  };

  const handleSignIn = () => {
    console.log("Sign in:", action);
  };

  const handleClick = (event) => {
    if (action === "Sign Up") {
      handleSignUp(event);
    }
    if (action === "Sign In") {
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
};
