import { useState } from "react";
import { Registration } from "./components/Registration";
import { SignIn } from "./components/SignIn";
import { MyPages } from "./components/MyPages";

export const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
      {user ? (
        <MyPages user={user} setUser={setUser} />
      ) : isRegistering ? (
        <Registration setIsRegistering={setIsRegistering} />
      ) : (
        <SignIn setIsRegistering={setIsRegistering} setUser={setUser} />
      )}
    </div>
  );
};
