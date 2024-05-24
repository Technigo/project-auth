import PropTypes from "prop-types";

export const Button = ({ action, setFormSelect, setIsRegistered }) => {
  const handleClick = () => {
    setIsRegistered(false);
    setFormSelect(action);

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
