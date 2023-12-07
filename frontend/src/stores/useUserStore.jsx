import { create } from "zustand";

//API from deployed Backend
//const myAPI = "https://project-auth-0x8y.onrender.com";
//API for localhost
const myAPI = "https://mongodb://127.0.0.1:27017/project-auth";
//const myAPI = "https://mongodb://localhost:27017/project-auth";

export const useUserStore = create((set, get) => ({
  username: "",
  email: "",
  password: "",
  accessToken: null,
  isLoggedIn: false,

  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  //------ Register a user Function -----//
  SignupNewUser: async (username, password, email) => {
    if (!username || !password || !email) {
      alert("Please enter username, email and password");
      return;
    }
    try {
      const response = await fetch(`${myAPI}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      const fetchWorked = data.success;

      if (fetchWorked) {
        set({ username });
        alert("Signup successful!");
      } else {
        alert(data.response || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  },

  // LOGIN
  //put code here
}));
