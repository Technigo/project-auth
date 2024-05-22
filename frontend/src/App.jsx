import { useState } from "react";
import { Registration } from "./components/Registration";
import { SignIn } from "./components/SignIn";

export const App = () => {
  // Default to show login-page
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <div>
      {isRegistering ? (
        <Registration setIsRegistering={setIsRegistering} />
      ) : (
        <SignIn setIsRegistering={setIsRegistering} />
      )}
    </div>
  );
};
