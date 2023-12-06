import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const storeHandleSignup = userStore((state) => state.handleSignup);

  const onSignupClick = async () => {
    if (!username || !password || !email) {
      alert("Please enter email, username and password");
      return;
    }
    try {
      await storeHandleSignup(username, password, email);
      if (username && password) {
        navigate("/"); //replace with your path
      }
    } catch (err) {
      // handle any errors that occur during signup
      console.error("Signup error:", err);
      alert("An error occurred during signup");
    }
  };

  return <div>Register</div>;
};
