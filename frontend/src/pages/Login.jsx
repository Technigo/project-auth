import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from '../components/ErrorMessage';
import { userStore } from "../stores/userStore";
import { BackButton } from "../components/BackButton";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const storeHandleLogin = userStore((state) => state.handleLogin);

    const onLoginClick = async () => {
        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }
        setIsLoading(true);
        try {
            await storeHandleLogin(username, password);
            if (userStore.getState().isLoggedIn) {
                navigate("/home");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

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
                {error && <ErrorMessage message={error} />}
                {isLoading ? (
                    <div>Loading...</div>  // Here you can place a spinner or loading animation
                ) : (
                    <div className="user-login">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setError("");
                                setUsername(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setError("");
                                setPassword(e.target.value);
                            }}
                        />
                        <button onClick={onLoginClick}>Login</button>
                    </div>
                )}
            </div>
        </>
    );
};
