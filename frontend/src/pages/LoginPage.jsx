import { LoginForm } from "../components/LoginForm";
import { userStore } from "../../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const storeHandleLogIn = userStore((state) => state.handleLogIn);

  const onLogInClick = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    try {
      await storeHandleLogIn(username, password);
      const isLoggedIn = userStore.getState().isLoggedIn;
      if (isLoggedIn) {
        navigate("/logged-in");
      }
    } catch (error) {
      console.error("Log in error:", error);
      alert("An error occured during log in");
    }
  };

  return (
    <>
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onLogInClick={onLogInClick}
      />
    </>
  );
};

//hej