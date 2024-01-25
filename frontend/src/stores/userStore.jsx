import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set, get) => ({
  email: "",
  setEmail: (email) => set({ email }),
  username: "",
  setUsername: (username) => set({ username }),
  password: "",
  setPassword: (password) => set({ password }),
  accessToken: null, // Add this if you plan to store the access token
  setAccessToken: (token) => set({ accessToken: token }),
  isLoggedIn: false, // Added to track if the user is logged in
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // FUNCTION TO REGISTER USERS
  handleSignup: async (email, username, password) => {
    if (!email || !username || !password) {
      alert("Please enter username, email and password");
      return;
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
        set({ username });
        // Redirect or update UI
        alert("Signup successful!");
        console.log("Signing up with:", username);
      } else {
        // Display error message from server
        alert(data.response || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  },

  // LOGIN
  handleLogin: async (username, password) => {
    // Check if both username and password are provided and display an alert if not.
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      // Send a POST request to the login endpoint with user data.
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Parse the response data as JSON.
      const data = await response.json();
      if (data.success) {
        // Update the state with username, accessToken, and set isLoggedIn to true.
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        });
        // Store the accessToken in the browser's localStorage.
        localStorage.setItem("accessToken", data.response.accessToken);
        // Display a success alert.
        alert("Login successful!");
        console.log("Logging in with:", username, password);
      } else {
        // Display an error message from the server or a generic message.
        alert("Incorrect username or password")
        throw new Error(data.response || "Login failed");
      }
    } catch (error) {
      // Handle and log any login errors.
      throw error;
    }
  },

  handleLogout: () => {
    // Clear user information and set isLoggedIn to false
    set({ username: "", accessToken: null, isLoggedIn: false });
    localStorage.removeItem("accessToken");
    // Additional logout logic if needed
  },
}));