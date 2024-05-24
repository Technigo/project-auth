import "./Buttons.css";

export const BtnSignIn = () => {
  return (
    <div className="button-container">
      <button onClick={() => console.log("Sign In button clicked")} type="button">
        Sign In
      </button>
    </div>
  );
};

export const BtnLogin = () => {
  return (
    <div className="button-container">
      <button onClick={() => console.log("Login button clicked")} type="button">
        Login
      </button>
    </div>
  );
};

export const BtnSubmit = () => {
  return (
    <div className="button-container">
      <button onClick={() => console.log("Submit button clicked")} type="submit">
        Submit
      </button>
    </div>
  );
};
