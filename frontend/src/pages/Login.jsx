import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser from the useUserStore hook
    const { loginUser, username, setUsername, password, setPassword } = useUserStore();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await loginUser(username, password);
            const isLoggedIn = useUserStore.getState().isLoggedIn;
            // If the user is logged in, the accessToken will be saved in localStorage and the user will be redirected to the dashboard
            if (isLoggedIn) {
                navigate("/dashboard");
                return;
            }
        } catch (error) {
            console.error("There was an error =>", error);
        }
    }

    return (
        <>
            <h1>Welcome here!</h1>
            <h2>Please sign in to see the content 🧡</h2>
            <form>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button onClick={handleLogin} type="submit">Login</button>
            </form>
        </>
    )
}
