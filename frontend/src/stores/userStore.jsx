// Importing the create function from Zustand for state management
import { create } from "zustand";
// Importing the function to retrieve and update the cart from local storage
import { retrieveCartFromStorage } from '../stores/cartStore';
// Accessing the environment variable for the backend API URL
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Creating a Zustand store for managing user-related state and actions
export const userStore = create((set, get) => ({
   // User-related state variables
  username: "",
  setUsername: (username) => set({ username }),
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  id: null,
  setId: (id) => set({ id: id }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // Function to register users
  handleSignup: async (username, password, email) => {
    if (!username || !password || !email) {
      alert("Please enter username, email and password");
      return false;
    }

    try {
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (data.success) {
        const loginSuccess = await get().handleLogin(username, password);
        if (loginSuccess) {
          retrieveCartFromStorage(get().id);
        }
        return loginSuccess;
      } else {
        alert(data.response || "Signup not successful!");
        return false;
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
      return false;
    }
  },

    // Function to handle user login
  handleLogin: async (username, password, redirectPath) => {
    console.log("handleLogin invoked with:", { username, password, redirectPath });
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      console.log("Sending login request to server");
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);
      if (response.ok && data.success) {
        // Update the state with username, accessToken, and login status
        set({
          username: username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
          id: data.response.id,
        }); 
        // Store the accessToken in localStorage for authentication
        localStorage.setItem("accessToken", data.response.accessToken);
         // Retrieve and update the cart from local storage
        retrieveCartFromStorage(data.response.id);
        console.log("Login successful!");
        return true;
      } else {
        alert(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login: " + (error.message || JSON.stringify(error)));
      return false;
    }
  },

  // Function to handle user logout
  handleLogout: () => {
    // Clear user information and set isLoggedIn to false
    set({ username: "", accessToken: null, isLoggedIn: false });
    // Remove the accessToken from localStorage
    localStorage.removeItem("accessToken");
    // Clear the temporary cart data from local storage
    localStorage.removeItem("tempCart");
    console.log("Cleared tempCart from local storage");
  },
}));
