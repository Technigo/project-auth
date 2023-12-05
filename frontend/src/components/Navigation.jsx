import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
    const { isLoggedIn, logoutUser } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.error("There was an error during logout =>", error);
        }
    }

    return (
        <nav>
            {isLoggedIn ? (
                <Link to="/logout" onClick={handleLogout}>Logout</Link>
            ) : (
                <>
                    <Link to="/">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )
}
