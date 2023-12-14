import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";

export const Profile = () => {
  const { isLoggedIn, accessToken } = userStore();
  const navigate = useNavigate();
  const storeHandleLogout = userStore((state) => state.handleLogout);
  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      alert("You don't have permission, please log in first!");
      navigate("/login");
    }
  }, [isLoggedIn, accessToken, navigate]);

  const onLogoutClick = async () => {
    storeHandleLogout();
    alert("Log out successfull");
    navigate("/login");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <nav>
        <ul>
          <li type="button" onClick={onLogoutClick}>
            Sign Out
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Profile;
