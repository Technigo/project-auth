import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";

const SignOutButton = () => {
    const storeHandleSignout = userStore((state) => state.handleSignOut);
    
    const onSignOutClick = () => {
        storeHandleSignout();
        alert("Sign out successful");
    };
    
    return (
        <Link to="/" className="button sign-out" onClick={onSignOutClick}>
            Sign Out
        </Link>
    );
};

export default SignOutButton;