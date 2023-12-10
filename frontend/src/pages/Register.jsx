// Import necessary modules and components
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

const Register = () => {
    // Get signIn function from User context
    const { signIn } = useUser();
    // Get navigate function from react-router
    const navigate = useNavigate();

    // Initialize state variables
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = async () => {
        try {
            // Reset error state and set loading state
            setError(false);
            setLoading(true);

            // Send POST request to /register endpoint
            const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, email, password }),
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

    return (
        <Card>
            <Input placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input className="mb-4" placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            {error && <p>Something went wrong!</p>}
            <div className="flex justify-between items-center">
                <Button disabled={loading} onClick={handleRegister}>Register</Button>
                <Link className="text-pink-500" to="/signin">Sign In</Link>
            </div>
        </Card>
    )
};

export default Register;    