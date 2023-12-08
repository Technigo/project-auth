import { create } from "zustand";
const apiEnv = import.meta.env.BACKEND_API;
console.log(apiEnv);

export const userStore = create((set, get) => ({
    // Using same properties as those in AdvertiserModel
    username: "",
    setUsername: (username) => set({username}),
    password: "",
    setPassword: (password) => set({password}),
    email: "",
    setEmail: (email) => set({email}),
    accessToken: null,
    setAccessToken: (token) => set({accessToken: token}),
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({isLoggedIn}),

    // Function to handle sign-up: First extracting the username, password, email from the fields; then making a POST request to the signup endpoint in database, where the authentication is carried out
    handleSignUp: async (username, password, email) => {
        if (!username || !password || !email) {
            alert("Please fill in all the fields");
            return;
        }

        try {
            const response = await fetch(`${apiEnv}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, email })
            });    

            const data = await response.json();

            if (data.success) {
                set({username, password, email});
                alert("Sign up successful");
                console.log("Signing up with: ", username);
            } else {
                alert(data.response || "Sign up failed");
            }
        } catch (error) {
            console.error("Signup error: ", error);
            alert("An error occurred during signup");
        }
    },

    // Function to handle log-in: First extracting the username, password from the fields; then making a POST request to the signin endpoint in database, where the authentication is carried out
    handleLogIn: async (username, password) => {
        if (!username || !password) {
            alert("Please fill in all the fields");
            return;
        }

        try {
            const response = await fetch(`${apiEnv}/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                set({
                    username,
                    accessToken: data.response.accessToken,
                    isLoggedIn: true
                });

                localStorage.setItem("accessToken", data.response.accessToken);
                alert("Log in successful");
                console.log("Logging in with: ", username);
            } else {
                alert(data.response || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
        }
    },

    // Function to handle log-out: redirect the user to the log-in page
    handleSignOut: () => {
        set({
            username: "",
            password: "",
            accessToken: null,
            isLoggedIn: false
        });
        localStorage.removeItem("accessToken");
    }
}));