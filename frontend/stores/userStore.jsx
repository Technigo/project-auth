// Importing the create function from the "zustand" library.
import { create } from "zustand";

// Fetching the backend API URL from the Vite environment variables.
const apiEnv = import.meta.env.VITE_BACKEND_API;

// Creating a user store using Zustand.
export const userStore = create((set, get) => ({
  // User information state variables.
  username: "",
  setUsername: (username) => set({ username }),
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),

  // Access token and login status state variables.
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // Additional state variables for storing data after login.
  loggedInData: null,

  // Handling user signup.
  handleSignUp: async (username, password, email) => {
    // Validating input fields.
    if (!username || !password || !email) {
      alert("Please enter username, password and email");
      return;
    }

    try {
      // Sending a POST request to the server for user registration.
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      // Parsing the response from the server.
      const data = await response.json();

      // Handling the server response.
      if (data.success) {
        set({ username });
        alert("Sign up successful!");
        console.log("sign up with:", username);
      } else {
        alert(data.response || "sign up failed");
      }
    } catch (error) {
      console.error("sign up error:", error);
      alert("An error occured during signup");
    }
  },

  // Handling user login.
  handleLogIn: async (username, password) => {
    // Validating input fields.
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      console.log("fetching log in");
      // Sending a POST request to the server for user login.
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // Logging the HTTP response status for debugging.
      console.log("TEST!", response.status);

      // Parsing the response from the server.
      const data = await response.json();

      // Handling the server response.
      if (data.success) {
        // Setting user information and login status.
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        });

        // Storing the access token in local storage.
        localStorage.setItem("accessToken", data.response.accessToken);

        alert("Log in successful!");
        console.log("Log in with:", username, password);
      } else {
        alert(data.response || "log in failed");
      }
    } catch (error) {
      console.error("Log in error:", error);
      alert("An error occurred during log in");
    }
  },

  // Fetching additional user data after successful login.
  fetchLoggedInData: async () => {
    try {
      // Retrieving the access token from the state.
      const accessToken = get().accessToken;

      // Sending a GET request to the server to fetch logged-in user data.
      const response = await fetch(`${apiEnv}/logged-in`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      // Parsing the response from the server.
      const data = await response.json();

      // Handling the server response.
      if (data.success) {
        // Setting the fetched data in the state.
        set({ loggedInData: data.response });
        console.log("Data from /logged-in", data);
      } else {
        console.error(data.response || "Failed to fetch /logged-in");
      }
    } catch (error) {
      console.error("Error fetching /logged-in:", error);
    }
  },

  // Handling user logout.
  handleLogOut: () => {
    // Clearing user information and access token.
    set({ username: "", accessToken: null, isLoggedIn: false });

    // Removing the access token from local storage.
    localStorage.removeItem("accessToken");
  },
}));
