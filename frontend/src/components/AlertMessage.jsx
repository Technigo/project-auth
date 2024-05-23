import PropTypes from "prop-types";
import "./AlertMessage.css";

export const AlertMessage = ({ type, message }) => {
  return (
    <div
      className={`alert-message ${
        type === "success" ? "background-success" : "background-error"
      }`}
    >
      <p>{message}</p>
    </div>
  );
};

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
