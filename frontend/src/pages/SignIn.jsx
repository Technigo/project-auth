import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

const SignIn = () => {
    const { signIn } = useUser();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSignIn = async () => {
        try {
            setError(false);
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                signIn(userData);
                navigate("/");
            } else {
                setError(true);
            }
        } catch (err) {
            console.error(err.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

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

export default SignIn;
