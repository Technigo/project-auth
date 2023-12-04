import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
        </nav>
    )
}
