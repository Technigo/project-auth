import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Lottie from "lottie-react";
import animationCat from "../assets/lottie-user.json";
import animationUnauth from "../assets/lottie-unauth.json";
import { AuthContext } from "../contexts/AuthContext";
import { LogoutButton } from "./LogoutButton";
import "./UserPage.css";

//authorize with access token from /user-page

export const UserPage = () => {
  const { authState, logout } = useContext(AuthContext);
  const { isAuthenticated, accessToken } = authState;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPage = async () => {
      try {
        const response = await fetch("http://localhost:8080/user-page", {
          headers: {
            Authorization: accessToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user page");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        logout();
      }
    };

    if (isAuthenticated) {
      fetchUserPage();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, accessToken, logout]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="unauthorized-message">
              <Lottie className="lottie" animationData={animationUnauth} />
        <p>You are not authorized to view this page. Please log in.</p>
        <Link to={"/"} className="back-link">
          <IoIosArrowBack />
          Back to first page
        </Link>
      </div>
    );
  }

  return (
    <div className="user-page-container">
      <h2 className="user-message">Congratulations! You are logged in!</h2>
      <Lottie className="lottie" animationData={animationCat} />
      <LogoutButton />
    </div>
  );
};
