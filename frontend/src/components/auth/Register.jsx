import "../../styling/Auth.css";

const Register = () => {
  return (
    <div className="authContainer">
      <h2 className="authTitle">Register</h2>
      <form className="authForm">
        <label htmlFor="username" className="authLabel">
          Username
        </label>
        <input type="text" id="username" required className="textInput" />
        <label htmlFor="password" className="authLabel">
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="passwordInput"
        />
        <button type="submit" className="authButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
