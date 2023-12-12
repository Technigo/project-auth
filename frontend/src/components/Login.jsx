import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";

// Getting the backend API URL from environment variables
const apiEnv = import.meta.env.VITE_BACKEND_API;

export const Login = () => {
  //Destructuring values from the userStore
  const {
    username,
    setUsername,
    password,
    setPassword,
    user,
    setUser,
    setAccessToken,
  } = userStore();
  const navigate = useNavigate();

  //Function to handle the login process
  const handleLogin = async () => {
    //Validation: Ensure both username and password are provided
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      //Sending a POST request to the backend API for login
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });
      console.log(response);

      //If the response is successful (status code 200)
      if (response.ok) {
        //Parse the response data as JSON
        const data = await response.json();
        //Update user data with the received access token
        setAccessToken(data.accessToken);
        //Update the user state with the received user data
        setUser(data);
        //Store the access token in local storage (NOT SURE THIS IS NECESSARY - Updating accesstoken state instead?)
        localStorage.setItem("accessToken", data.accessToken);
        setUsername("");
        setPassword("");
        //Display a success alert and navigate to the "/logged-in" route
        alert("Login successful!");
        navigate("/logged-in");
      } else {
        // If the response is not successful, extract the error message and display it in an alert
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      //Handle any errors that occur during the login process and display alert
      alert("Error during login:", error.message);
    }
  };

  //Just a console logging the user for debuggning purposes:
  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  return (
    <div className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
