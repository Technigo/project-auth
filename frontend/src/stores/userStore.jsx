import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set) => ({
    // State variables and their setter methods
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
    errorMessage: '',
    setErrorMessage: (message) => set({ errorMessage: message }),
    successMessage: '',
    setSuccessMessage: (message) => set({ successMessage: message }),

    handleSignup: async (username, password, email) => {
        if (!username || !password || !email) {
            set({ errorMessage: "Please enter username, email and password" });
            return;
        }

        try {
            const response = await fetch(`${apiEnv}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, username, password })
            });

            const data = await response.json();
            if (data.success) {
                set({ username, isLoggedIn: true }); // Assuming the user is logged in upon signup
                set({ successMessage: "Signup successful!" });
                console.log("Signing up with:", username);
                return { success: true }; // Return a success indicator
            } else {
                set({ errorMessage: data.response || "Signup failed" });
                return { success: false }; // Return a failure indicator
            }
        } catch (error) {
            console.error("Signup error:", error);
            set({ errorMessage: "An error occurred during signup" });
            return { success: false }; // Return a failure indicator
        }
    },

    // LOGIN
    handleLogin: async (username, password) => {
        if (!username || !password) {
            set({ errorMessage: "Please enter both username and password" });
            return;
        }

        try {
            const response = await fetch(`${apiEnv}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                set({
                    username,
                    accessToken: data.response.accessToken,
                    isLoggedIn: true,
                }); // Update the state with username and accessToken
                // Redirect or update UI
                localStorage.setItem("accessToken", data.response.accessToken);
                set({ successMessage: "Login successful!" });
            } else {
                // Display error message from server
                set({ errorMessage: data.response || "Login failed" });
            }
        } catch (error) {
            console.error("Login error:", error);
            set({ errorMessage: "An error occurred during login" });
        }
    },
    handleLogout: () => {
        // Clear user information and set isLoggedIn to false
        set({ username: "", accessToken: null, isLoggedIn: false, errorMessage: '', successMessage: '' });
        localStorage.removeItem("accessToken");
        // Additional logout logic if needed
    },
}));

//This store serves as a centralized place to manage user-related state and actions in the application, providing methods to handle user authentication, login, signup, and logout.