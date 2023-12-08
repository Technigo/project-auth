import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { isLoggedIn } = userStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    alert("You don't have permission, please log in first😍");
    navigate("/login");
    return null;
  }
  return (
    <div>We will continue to work with this profile page with private part</div>
  );
};
