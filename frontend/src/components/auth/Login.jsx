import "../../styling/Auth.css";

const Login = () => {
  return (
    <div className="authContainer">
      <h1 className="authTitle">Login</h1>
      <form className="authForm">
        <label className="authLabel">
          Username:
          <input type="text" required className="textInput" />
        </label>
        <label className="authLabel">
          Password:
          <input type="password" required className="passwordInput" />
        </label>
        <button type="submit" className="authButton">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
