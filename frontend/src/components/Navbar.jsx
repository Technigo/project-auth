import { userStore } from "../store/userStore";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const isLoggedIn = userStore.getState().isLoggedIn;
  const storeHandleLogout = userStore((state) => state.handleLogout);
  const navigate = useNavigate();

  const clickLogout = () => {
    storeHandleLogout();
    alert("You have successfully been logged out.");
    navigate("/");
  };
  return (
    <nav>
      {isLoggedIn ? (
        <button onClick={clickLogout}>Sign out</button>
      ) : (
        <>
          <div className="home-link">
            <Link to="/">Home</Link>
          </div>
          <div className="signin-register">
            <Link to="/signin">Sign In</Link>
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
    </nav>
  );
};
