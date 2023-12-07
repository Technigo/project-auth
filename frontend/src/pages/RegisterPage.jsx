import { RegisterForm } from "../components/RegisterForm";
import { userStore } from "../../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const storeHandleSignUp = userStore((state) => state.handleSignUp);

  const onSignUpClick = async () => {
    if (!username || !password || !email) {
      alert("Please enter username, password and email");
      return;
    }
    try {
      await storeHandleSignUp(username, password, email);
      if (username && password) {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occured during sign up");
    }
  };

  console.log(email);

  return (
    <div>
      <RegisterForm
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSignUpClick={onSignUpClick}
      />
    </div>
  );
};
