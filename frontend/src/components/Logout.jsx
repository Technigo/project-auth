import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";

// Functional component definition for the logout button
export const Logout = () => {
  // Accessing the navigation function from React Router
  const navigate = useNavigate();
  // Destructuring action functions from the user store
  const { setAccessToken, setIsLoggedIn, setUser } = userStore();

  // Function to handle the logout process
  const handleLogOut = () => {
    // Clearing user-related state and local storage data
    setUser(null); // Setting user data to null
    setAccessToken(null); // Clearing the access token
    setIsLoggedIn(false); // Setting isLoggedIn to false
    localStorage.removeItem("accessToken"); // Removing access token from local store
    // Alerting the user about successful logout and navigating to the home page
    alert("Log out successful!");
    navigate("/");
  };

  // Rendering the logout button
  return (
    <>
      <button onClick={handleLogOut}>Log out</button>
    </>
  );
};
