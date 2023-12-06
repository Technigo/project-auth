import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import "./getStarted.css";

export const GetStarted = () => {
    const navigate = useNavigate();

    // Destructures the function loginUser from the useUserStore hook
    const { loginUser, registerUser, username, setUsername, password, setPassword } = useUserStore();

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

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            await registerUser(username, password);
            if (username && password) {
                navigate("/getstarted");
                return;
            }
        } catch (error) {
            console.error("There was an error during signup =>", error);
        }
    }

    return (
        <>
            <h1>Welcome here!</h1>
            <h2>Please sign in to see the content 🧡</h2>
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div className="loginAndRegisterBtns">
                    <Button className={"primary"} handleOnClick={handleLogin} btnText={"Login"} />
                    <Button className={"secondary"} handleOnClick={handleRegister} btnText={"Register"} />
                </div>
            </form>
        </>
    )
}
