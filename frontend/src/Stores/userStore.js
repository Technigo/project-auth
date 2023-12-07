import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;
export const userStore = create((set) => ({
  username: "",
  setUsername: (username) => set({ username }),
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  //function to register users
  handleSignup: async (username, password, email, navigate) => {
    if (!username || !password || !email) {
      alert("Please enter username, email and password");
      return;
    }
    try {
      const response = await fetch(`${apiEnv}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        set({ username });
        // redirect or update UI
        alert("Sign up successful");
        console.log("sign up with:", username);
        navigate("/");
      } else {
        //Display errormessage from server
        alert(data.message || "signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occured during signup");
    }
  },
  //Login
  handleLogin: async (username, password) => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      const response = await fetch(`${apiEnv}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("Login response data:", data); // Log for debugging
      if (data.success) {
        set({
          username: data.username || username,
          accessToken: data.accessToken,
          isLoggedIn: true,
        }); //update the state with username and accesstoken
        //redirect or update UI
        localStorage.setItem("accessToken", data.accessToken);
        alert("Login successful!");
        console.log("Loging up with:", username, password);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  },

  handleLogout: () => {
    // Clear user information unset isLoggedIn to false
    set({ username: "", accessToken: null, isLoggedIn: false });
    localStorage.removeItem("accessToken");
    //additional logout logic if needed
  },
}));
