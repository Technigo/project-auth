import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from '../components/reusableComponents/ErrorMessage';
import { userStore } from "../stores/userStore";
import { BackButton } from "../components/reusableComponents/BackButton";
import { Button } from "../components/reusableComponents/Button";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { errorMessage, setErrorMessage, handleLogin, isLoggedIn } = userStore((state) => ({
        errorMessage: state.errorMessage,
        setErrorMessage: state.setErrorMessage,
        handleLogin: state.handleLogin,
        isLoggedIn: state.isLoggedIn
    }));

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        return () => {
            setErrorMessage('');
        };
    }, [setErrorMessage]);

    const onLoginClick = async () => {
        setErrorMessage("");
        if (!username || !password) {
            setErrorMessage("Please enter both username and password");
            return;
        }

        setIsLoading(true);
        try {
            await handleLogin(username, password);
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred during login");
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
            <div className="login">
                <BackButton redirectTo="/" />
                <h2>{text.heading}</h2>
                <p>{text.loremIpsum}</p>
                {errorMessage && <ErrorMessage message={errorMessage} />}
                {isLoading ? (
                    <div>Loading...</div>  // Replace with a spinner or animation
                ) : (
                    <div className="user-login">
                        <input
                            type="text"
                            aria-label="Username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            aria-label="Password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            label="Login"
                            onClick={onLoginClick}
                            className="button"
                            ariaLabel="Login"
                            disabled={isLoading}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
