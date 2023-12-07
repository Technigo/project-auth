import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set, get) => ({
  username: "",
  setUsername: (username) => set({ username }),
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  handleSignUp: async (username, password, email) => {
    if (!username || !password || !email) {
      alert("Please enter username, password and email");
      return;
    }
    try {
      const response = await fetch(`${apiEnv}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await response.json();
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
  handleLogIn: async (username, password) => {
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      const response = await fetch(`${apiEnv}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        set({
          username,
          accessToken: data.response.accessToken,
          isLoggedIn: true,
        });
        localStorage.setItem("accessToken", data.response.accessToken);
        alert("Log in successful!");
        console.log("Log in with:", username, password);
      } else {
        alert(data.response || "log in failed");
      }
    } catch (error) {
      console.error("Log in error:", error);
      alert("An error occured during log in");
    }
  },
  handleLogOut: () => {
    set({ username: "", accessToken: null, isLoggedIn: false });
    localStorage.removeItem("accessToken");
  },
}));
