import "./Buttons.css";

export const BtnSignIn = ({ onClick }) => {
  return (
    <div className="button-container">
      <button onClick={onClick} type="button">
        Sign In
      </button>
    </div>
  );
};

export const BtnLogin = ({ onClick }) => {
  return (
    <div className="button-container">
      <button onClick={onClick} type="button">
        Login
      </button>
    </div>
  );
};

export const BtnSubmit = ({ onClick }) => {
  return (
    <div className="button-container">
      <button onClick={onClick} type="submit">
        Submit
      </button>
    </div>
  );
};
