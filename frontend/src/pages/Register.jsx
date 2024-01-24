import { userStore } from "../stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/reusableComponents/BackButton";
import { ErrorMessage } from '../components/reusableComponents/ErrorMessage';
import { Button } from "../components/reusableComponents/Button";

export const Register = () => {
    // States
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Initialize the navigate function
    const navigate = useNavigate();

    // Function to handle the click event of the signup button
    const storeHandleSignup = userStore((state) => state.handleSignup);

    // Function for basic email validation
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    // Combined function for handling the signup click event
    const onSignupClick = async () => {
        setError(""); // Clear previous error

        // Validate email
        if (!isValidEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Validate username length
        if (username.length < 5) {
            setError("Username must be at least 5 characters long");
            return;
        }

        // Validate password length
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        try {
            const signupResponse = await storeHandleSignup(username, password, email);
            if (signupResponse && signupResponse.success) {
                navigate("/home"); // Navigate to home after successful signup
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setError("An error occurred during signup");
        }
    };

    // Text
    const text = {
        heading: "Sign Up",
        intro: "Get ready to share your sneakers with the world",
    };

    return (
        <>
            <div className="register">
                <BackButton redirectTo="/" />
                <h2>{text.heading}</h2>
                <p>{text.intro}</p>
                {error && <ErrorMessage message={error} />}
                <div className="user-registration">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setError(""); // Clear error when user starts typing
                            setEmail(e.target.value);
                        }}
                    />
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
                    <Button
                        label="Sign Up"
                        onClick={onSignupClick}
                        className="signup-button"
                        ariaLabel="Sign Up"
                    />
                </div>
            </div>
        </>
    );
};
