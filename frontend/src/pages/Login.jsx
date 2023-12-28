import { BackButton } from "../components/BackButton"
import { userStore } from "../stores/userStore"; // Make sure this is correctly imported
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ErrorMessage } from '../components/ErrorMessage';


export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Function to handle the click event of the login button
    const storeHandleLogin = userStore((state) => state.handleLogin);

    // Combined function for handling the login click event
    const onLoginClick = async () => {
        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }
        try {
            await storeHandleLogin(username, password);
            const isLoggedIn = userStore.getState().isLoggedIn;
            console.log(isLoggedIn);
            if (isLoggedIn) {
                navigate("/home");
            }
            // Additional logic after successful login can be added here
        } catch (error) {
            // Handle any errors that occur during login
            console.error("Login error:", error);
            setError("An error occurred during login");
        }
    };
    



    // Text
    const text = {
        heading: "Login",
        loremIpsum: "Please enter username and password"
    };

    return (
        <>
            <div>
                <BackButton />
                <h2>{text.heading}</h2>
                <p>{text.loremIpsum}</p>
                {/* Display error message if there is an error */}
                {error && <ErrorMessage message={error} />}
                <div className="user-login">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setError(""); // Clear error when user starts typing
                            setUsername(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setError(""); // Clear error when user starts typing
                            setPassword(e.target.value);
                        }}
                    />
                    <button onClick={onLoginClick}>Login</button>
                </div>
            </div>
        </>
    )

}
