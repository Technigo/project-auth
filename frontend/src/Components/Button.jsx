import PropTypes from "prop-types";

export const Button = ({
  action,
  setFormSelect,
  setIsRegistered,
  setIsLoggedIn,
}) => {
  const handleClick = () => {
    setIsRegistered(false);
    setFormSelect(action);

    if (action === "Log Out") {
      // setIsLoggedIn(false);
      localStorage.clear();
      console.log("Cleared Acces token:", localStorage.getItem("access_token"));
      setIsLoggedIn(false);
    }
  };

  return (
    <>
      <button
        id={action.toLowerCase().replace(/\s/g, "")}
        className="buttonstyle"
        onClick={handleClick}
      >
        {action}
      </button>
    </>
  );
};

Button.propTypes = {
  action: PropTypes.string,
  setFormSelect: PropTypes.func,
  setIsRegistered: PropTypes.func,
  setIsLoggedIn: PropTypes.func,
};
