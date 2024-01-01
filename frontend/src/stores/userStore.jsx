import { create } from "zustand";
const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set, get) => ({
  username: "",
  setUsername: (username) => set({ username }),
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  accessToken: null, // Add this if you plan to store the access token
  setAccessToken: (token) => set({ accessToken: token }),
  id: null,
  setId: (id) => set({ id: id }),

  isLoggedIn: false, // Added to track if the user is logged in
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  // FUNCTION TO REGISTER USERS
  handleSignup: async (username, password, email) => {
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
        set({ username, email, password });
        // Redirect or update UI
        alert("Signup successful!");
      } else {
        // Display error message from server
        alert(data.response || "Signup not successful!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  },

  // LOGIN
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
        set({
          username: username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
          id: data.response.id,
        }); // Update the state with username and accessToken
        // Redirect or update UI
        localStorage.setItem("accessToken", data.response.accessToken);

        console.log("Login successful!");
        return true; 
      } else {
        // Display error message from server
        alert(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login: " + (error.message || JSON.stringify(error)));
      return false;
    }
  },

  handleLogout: () => {
    // Clear user information and set isLoggedIn to false
    set({ username: "", accessToken: null, isLoggedIn: false });
    localStorage.removeItem("accessToken");
    // Additional logout logic if needed
  },
}));
