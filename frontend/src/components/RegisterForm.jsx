import { Link } from "react-router-dom";

export const RegisterForm = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  onSignUpClick,
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
        <div className="email-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
          />
        </div>
        <button onClick={onSignUpClick}>Register</button>
      </div>
      <Link to="/">
        <button>Login</button>
      </Link>
    </>
  );
};
