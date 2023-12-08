import { Link } from "react-router-dom";
import { userStore } from "../stores/userStore";

const SignOutButton = () => {
    const storeHandleSignout = userStore((state) => state.handleSignout);
    
    const onSignOutClick = () => {
        storeHandleSignout();
    };
    
    return (
        <Link to="/" className="button" onClick={onSignOutClick}>
            Sign Out
        </Link>
    );
};

export default SignOutButton;