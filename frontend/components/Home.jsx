import { Login } from "./Login.jsx"
import { Registration } from "./Registration.jsx"
import { useState } from 'react';

export const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <h1>Home</h1>
      <p>Welcome home old or new sailors!</p>
      {showLogin ? (
        <>
          <p>Not a member? Register here</p>
          <button onClick={() => setShowLogin(false)}>Register</button>
          <Login />
        </>
      ) : (
        <>
          <p>Already a member? Login here</p>
          <button onClick={() => setShowLogin(true)}>Login</button>
          <Registration />
        </>
      )}
    </>
  );
}
