import PropTypes from "prop-types";

export const Button = ({ action }) => {
  let isRegistration = true;
  if (action === "Sign Up") {
    isRegistration = true;
  } else {
    isRegistration = false;
  }

    const handleClick = 

  const handleSignUp = () => {
    console.log("Sign up:", action);
  };

  const handleSignIn = () => {
    console.log("Sign in:", action);
  };

  return (
    <>
      <button
        className="buttonstyle"
        onClick={isRegistration ? handleSignUp : handleSignIn}
      >
        {action}
      </button>
    </>
  );
};

Button.propTypes = {
  action: PropTypes.string,
};
