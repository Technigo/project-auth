import { create } from "zustand"

export const userStore = create((set, get) => ({

    username: "",
    password: "",
    accessToken: null,
    user: null,
    isLoggedIn: false,

    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setAccessToken: (accessToken) => set({ accessToken }),
    setUser: (user) => set({ user }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn })

}))