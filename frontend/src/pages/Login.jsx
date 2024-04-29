
import { Link } from "react-router-dom";
import { userStore } from "../store/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Login = () => {
    // State for login
    // const [loginUsername, setLoginUsername] = useState("");
    // const [loginPassword, setLoginPassword] = useState("");
    // // State for signup
    // const [signupUsername, setSignupUsername] = useState("");
    // const [signupPassword, setSignupPassword] = useState("");
    // const [signupEmail, setSignupEmail] = useState("");

    // const navigate = useNavigate();
    // const [message, setMessage] = useState("");


    // const { handleLogin, handleSignup } = userStore((state) => ({
    //     handleLogin: state.handleLogin,
    //     handleSignup: state.handleSignup,
    // }));

    // // Login submission
    // const onLoginSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const success = await handleLogin(loginUsername, loginPassword);
    //         if (success) navigate("/home");
    //         else alert("Login failed.");
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         alert("An error occurred during login.");
    //     }
    // };

    // // Signup submission
    // const onSignupSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await handleSignup(signupUsername, signupPassword, signupEmail);
    //         alert("Signup successful. Please log in.");
    //         // Optionally clear the form or navigate
    //     } catch (error) {
    //         console.error("Signup error:", error);
    //         alert("An error occurred during signup.");
    //     }
    // };

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    // State for signup
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupEmail, setSignupEmail] = useState("");

    const navigate = useNavigate();
    const [message, setMessage] = useState("");


    const { handleLogin, isLoggedIn, handleSignup } = userStore((state) => ({
        handleLogin: state.handleLogin,
        isLoggedIn: state.isLoggedIn,
        handleSignup: state.handleSignup,
    }));

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn, navigate]);

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const result = await handleLogin(loginUsername, loginPassword);
        setMessage(result.message);
    };


    const onSignupSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const result = await handleSignup(signupUsername, signupPassword, signupEmail);
        setMessage(result.message);
        setSignupUsername('');
        setSignupPassword('');
        setSignupEmail('');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
            <div className="w-full max-w-md space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign Up
                </h2>
                <form onSubmit={onSignupSubmit} className="mt-8 space-y-6">
                    <input
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Username"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                    />
                    <input
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        type="email"
                        placeholder="Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                    />
                    <input
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        type="password"
                        placeholder="Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>

                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Login
                </h2>
                <form onSubmit={onLoginSubmit} className="mt-8 space-y-6">
                    <input
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                    <input
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                {message && <div className="text-base md:text-xl lg:text-3xl font-light mb-4 text-black text-center
">{message}</div>}
            </div>
        </div>
    );
};







