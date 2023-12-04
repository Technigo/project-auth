import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const navigate = useNavigate();

    // const API_URL = import.meta.env.API_KEY;
    const API_URL = "http://localhost:8080";
    const withEndpoint = (endpoint) => `${API_URL}/${endpoint}`;

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(withEndpoint("register"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
            // Handle login success (e.g., store access token, redirect to dashboard)
            setIsLoggedIn(true);

            if (isLoggedIn) {
                console.log("isLoggedIn", isLoggedIn);
                return;
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <>
            <h1>Welcome here!</h1>
            <h2>Please sign in to see the content 🧡</h2>
            <form onSubmit={handleLogin} >
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button type="submit">Login</button>
            </form>
        </>
    )
}
