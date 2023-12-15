// src/components/Register.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";

const Register = () => {
    // State to store form data
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Access the history object to navigate between pages
    const navigate = useNavigate();
    const { login } = authStore();

    // Handle form submission
    const handleSubmit = async () => {
        if (!username || !password || !email) {
            // Display an alert if any of the required fields are empty.
            alert("Please enter email, username, and password");
            return;
        }
        //e.preventDefault();
        console.log(username, email, password);

        try {
            // Make a POST request to the registration endpoint
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });

            // Check if the request was successful (status code 2xx)
            const data = await response.json();
            console.log(data);
            if (data.success) {
                // Parse the response JSON to get the access token
                // login(data.accessToken); // Use the login action from the store
                //navigate("/dashboard");
            } else {
                // Handle registration error (status code is not 2xx)
                // const errorData = await response.json();
                //console.error("Registration error:", errorData.error);
                // Display an error message to the user, e.g., set a state variable for displaying an error message
            }
        } catch (error) {
            // Handle network errors or other unexpected errors
            console.error("Unexpected error during registration:", error);
            // Display a generic error message to the user
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <div>
                {/* Registration form fields */}
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Submit button */}
                <button onClick={handleSubmit}>Register</button>
            </div>
        </div>
    );
};

export default Register;

