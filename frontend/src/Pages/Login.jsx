import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (event) => {
   event.preventDefault();
   const userInfo = {
     email: email, 
     password: password,
   };

   try {
     // Replace API endpoint
     const response = await fetch("https://your-api-url.com/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(userInfo),
     });

     if (!response.ok) {
       throw new Error("Failed to login");
     }

     const data = await response.json(); 
     localStorage.setItem("Net-Token", data.token); 
     navigate("/"); 
   } catch (error) {
     console.error("Login error:", error.message);
     alert("Login failed: " + error.message);
   }
 };

 useEffect(() => {
   if (localStorage.getItem("Net-Token")) {
     navigate("/");
   }
 }, [navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <img src="/public/login.png" className="login-icon" alt="Login Icon" />
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Account：</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password：</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>
        Haven't signed up yet？Click <a href="/signup">here</a> to sign up
      </p>
    </>
  );
};