import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const PrivateRoute = ({ children }) => {
    const { isSignedIn } = useUser();
    if (isSignedIn) {
        return children;
    }

    return <Navigate to="/signin" replace />;
};

export default PrivateRoute;
