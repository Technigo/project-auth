import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Profile = () => {
  const { isLoggedIn } = userStore();
  const navigate = useNavigate();
  const storeHandleLogout = userStore((state) => state.handleLogout);
  useEffect(() => {
    if (!isLoggedIn) {
      alert("You don't have permission, please log in first!");
      navigate("/login");
      return;
    }
  }, []);

  const onLogoutClick = async () => {
    storeHandleLogout();
    alert("Log out successfull");
    navigate("/login");
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>
          We will continue to work with this profile page with private part
        </h1>
        <nav>
          <ul>
            <li type="button" onClick={onLogoutClick}>
              Sign Out
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return null;
  }
};
