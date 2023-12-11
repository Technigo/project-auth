import { create } from "zustand";

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const userStore = create((set, get) => ({
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
    handleSignup: async (username, password, email) => {
        if (!username || !password || !email) {
            alert("Please enter username, email and password");
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
        if (!username || !password) {
            alert("Please enter both username and password");
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
                alert("Login successful!");
                console.log("Loging up with:", username, password);
            } else {
                // Display error message from server
                alert(data.response || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        }
    },
    handleLogout: () => {
        // Clear user information and set isLoggedIn to false
        set({ username: "", accessToken: null, isLoggedIn: false });
        localStorage.removeItem("accessToken");
        // Additional logout logic if needed
    },
}));

//This store serves as a centralized place to manage user-related state and actions in the application, providing methods to handle user authentication, login, signup, and logout.