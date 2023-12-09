import { Link } from "react-router-dom";

export const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  onLogInClick,
}) => {
  return (
    <>
      <div className="form">
        <div className="username-input">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
        </div>
        <div className="password-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <button onClick={onLogInClick}>Log in</button>
      </div>
      <Link to="/register">
        <button>Create a account</button>
      </Link>
    </>
  );
};
