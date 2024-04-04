
import { Link } from "react-router-dom";
import { userStore } from "../store/userStore"; // Adjust the import path as needed
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Logos from "../components/Logos"; // Ensure this is correctly imported

export const Login = () => {
    // State for login
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    // State for signup
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupEmail, setSignupEmail] = useState("");

    const navigate = useNavigate();
    const [message, setMessage] = useState("");


    const { handleLogin, handleSignup } = userStore((state) => ({
        handleLogin: state.handleLogin,
        handleSignup: state.handleSignup,
    }));

    // Login submission
    const onLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await handleLogin(loginUsername, loginPassword);
            if (success) navigate("/home");
            else alert("Login failed.");
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    // Signup submission
    const onSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSignup(signupUsername, signupPassword, signupEmail);
            alert("Signup successful. Please log in.");
            // Optionally clear the form or navigate
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
        }
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
            </div>
        </div>
    );
};







// export const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState(""); // Additional state for sign-up
//     const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up

//     const navigate = useNavigate();

//     const storeHandleLogin = userStore((state) => state.handleLogin);
//     const storeHandleSignup = userStore((state) => state.handleSignup); // Access the sign-up function

//     const onSubmit = async () => {
//         if (!username || !password || (isSignUp && !email)) {
//             alert("Please fill in all fields");
//             return;
//         }

//         try {
//             let isSuccess = false;
//             if (isSignUp) {
//                 // Sign-up logic
//                 await storeHandleSignup(username, password, email);
//                 // Optionally, display a message or handle the UI state change to indicate successful signup.
//                 alert("Signup successful, please login.");
//                 isSuccess = true;
//             } else {
//                 // Login logic
//                 const success = await storeHandleLogin(username, password);
//                 if (success) { // Assuming handleLogin resolves to true/false based on success
//                     navigate("/home"); // Navigate to /home only after successful login
//                 } else {
//                     alert("Login failed");
//                 }
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert(`An error occurred during ${isSignUp ? "sign up" : "login"}`);
//         }
//     };


//     return (
//         <>
//             <nav>
//                 {/* Toggle between Login and Sign Up */}
//                 <button onClick={() => setIsSignUp(false)}>Login</button>
//                 <button onClick={() => setIsSignUp(true)}>Sign Up</button>
//             </nav>
//             {/* <Logos /> */}
//             <div>
//                 <h2>{isSignUp ? "Sign Up" : "Login"} Page</h2>
//                 <div className="user-auth">
//                     <input
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     {isSignUp && (
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     )}
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <button onClick={onSubmit}>{isSignUp ? "Sign Up" : "Login"}</button>
//                 </div>
//             </div>
//         </>
//     );
// };









// // Import the 'Logos' component and the 'Link' component from 'react-router-dom'.
// // import Logos from "../components/Logos";
// import { Link } from "react-router-dom";
// // Import the 'userStore' from the 'userStore' module.
// import { userStore } from "../store/userStore"; // Make sure this is correctly imported
// // Import the 'useState' and 'useNavigate' hooks from 'react'.
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// // Define the 'Login' functional component.
// export const Login = () => {
//     // Create state variables for 'username' and 'password' using 'useState'.
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     // Use the 'useNavigate' hook to programmatically navigate between routes.
//     const navigate = useNavigate();

//     // Access the 'handleLogin' function from the 'userStore'.
//     const storeHandleLogin = userStore((state) => state.handleLogin);

//     // Function to handle the click event of the login button.
//     const onLoginClick = async () => {
//         if (!username || !password) {
//             // Display an alert if either 'username' or 'password' is empty.
//             alert("Please enter both username and password");
//             return;
//         }
//         try {
//             // Call the 'handleLogin' function from 'userStore' with 'username' and 'password' parameters.
//             await storeHandleLogin(username, password);
//             // Get the 'isLoggedIn' state from 'userStore'.
//             const isLoggedIn = userStore.getState().isLoggedIn;
//             if (isLoggedIn) {
//                 // If the user is logged in, navigate to the "/home" route.
//                 navigate("/home");
//             }
//             // Additional logic after successful login can be added here.
//         } catch (error) {
//             // Handle any errors that occur during login and display an alert.
//             console.error("Login error:", error);
//             alert("An error occurred during login");
//         }
//     };

//     // Text content for the heading and paragraphs.
//     const text = {
//         heading: "Login Page",
//         intro: "login here...",
//         loremIpsum:
//             "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
//     };

//     // Render the component content.
//     return (
//         <>
//             <nav>
//                 {/* Create a navigation menu with links to the login and sign-up routes. */}
//                 <ul className="app-ul">
//                     <li className="app-li">
//                         <Link to="/">Login</Link>
//                     </li>
//                     <li className="app-li">
//                         <Link to="/register">Sign Up</Link>
//                     </li>
//                 </ul>
//             </nav>
//             {/* Render the 'Logos' component. */}
//             {/* <Logos /> */}
//             <div>
//                 {/* Display the heading and paragraphs. */}
//                 <h2>{text.heading}</h2>
//                 <p>{text.intro}</p>
//                 <p>{text.loremIpsum}</p>
//                 <div className="user-login">
//                     {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
//                     <input
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
//                     <button onClick={onLoginClick}>Login</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.
