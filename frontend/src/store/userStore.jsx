//Tried my best to understand the usage of the following code from the class
//Meanwhile, I will use this to try out if my front end would work

import { create } from "zustand";

export const userStore = create((set, get) => ({
  username: "",
  setUsername: (username) => set({ username }),
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  accessToken: null, // Add this if you plan to store the access token
  setAccessToken: (token) => set({ accessToken: token }),
  isLoggedIn: false, // Added to track if the user is logged in
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // FUNCTION TO REGISTER USERS
  handleSignup: async (username, password, email) => {
    const apiEnv = import.meta.env.VITE_BACKEND_API;
    if (!username || !password || !email) {
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
    const apiEnv = import.meta.env.VITE_BACKEND_API;
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      console.log("Before API call");
      const response = await fetch(`${apiEnv}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("After API call");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          set({
            username,
            accessToken: data.response.accessToken,
            isLoggedIn: true,
          }); // Update the state with username and accessToken
          // Redirect or update UI
          localStorage.setItem("accessToken", data.response.accessToken);
          alert(`Login successful! Welcome, ${data.response.username}!`);
          console.log("Loging up with:", username, data.response.accessToken);
        } else {
          // Display error message from server
          alert("Login failed");
        }
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      alert("An error occurred during login");
    }
  },
  handleLogout: () => {
    // Clear user information and set isLoggedIn to false
    set({ username: "", accessToken: null, isLoggedIn: false });
    localStorage.removeItem("accessToken");
  },
}));
