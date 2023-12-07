import { Link } from "react-router-dom";

const SignOutButton = () => {
    return (
        <Link to="/" className="button">
            Sign Out
        </Link>
    );
};

export default SignOutButton;