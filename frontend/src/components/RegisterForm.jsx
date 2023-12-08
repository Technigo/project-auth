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
    <div>
      <div className="form">
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <button onClick={onSignUpClick}>Register</button>
      </div>
      <Link to="/">
        <button>Login</button>
      </Link>
    </div>
  );
};