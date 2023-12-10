// Import necessary modules and components
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

// Define SignIn component
const SignIn = () => {
    // Get signIn function from User context
    const { signIn } = useUser();
    // Get navigate function from react-router
    const navigate = useNavigate();

    // Initialize state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Define handleSignIn function
    const handleSignIn = async () => {
        try {
            // Reset error state and set loading state
            setError(false);
            setLoading(true);

            // Send POST request to /signin endpoint
            const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            // If request is successful, sign in user and navigate to home page
            if (response.ok) {
                const userData = await response.json();
                signIn(userData);
                navigate("/");
            } else {
                // If request is not successful, set error state
                setError(true);
            }
        } catch (err) {
            // If an error occurs, set error state
            setError(true);
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    // Render SignIn component
    return (
        <Card>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input className="mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            {error && <p>Something went wrong!</p>}
            <div className="flex justify-between items-center">
                <Button disabled={loading} onClick={handleSignIn}>Sign In</Button>
                <Link className="text-pink-500" to="/register">Register</Link>
            </div>
        </Card>
    );
};

// Export SignIn component
export default SignIn;