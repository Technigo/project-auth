import { useEffect, useState } from "react";

import { MyPages } from "./components/MyPages";
import { Registration } from "./components/Registration";
import { SignIn } from "./components/SignIn";

export const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data is available in localStorage on component mount
    const accessToken = localStorage.getItem("accessToken");
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    if (accessToken && userName && userId) {
      setUser({ id: userId, name: userName });
    }
  }, []);

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
