import { create } from "zustand";

// Creating a user store using the 'create' function from 'zustand'
export const userStore = create((set, get) => ({
  // Initial state variables for user information
  username: "",
  password: "",
  accessToken: null,
  user: null,
  isLoggedIn: false,

  // Action functions to update state variables
  setUsername: (username) => set({ username }), // Updates the 'username' state
  setPassword: (password) => set({ password }), // Updates the 'password state
  setAccessToken: (accessToken) => set({ accessToken }), // Updated the 'accessToken' state
  setUser: (user) => set({ user }), // Updates the 'user state
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }), // Updated the 'isLoggedIn' state
}));
