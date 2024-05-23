import PropTypes from "prop-types";
import { Button } from "./Button";

export const Form = ({ action }) => {
  handleSubmit = () => {};

  return (
    <div>
      {action} <span>Form</span>
      <form>
        <label>Username:</label>
        <input />
        <label>Password:</label>
        <input />
        <submit>
          <Button action="Submit" />
        </submit>
      </form>
    </div>
  );
};

Form.propTypes = {
  action: PropTypes.string,
};
