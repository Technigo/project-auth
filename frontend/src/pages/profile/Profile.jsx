import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import { useParams } from "react-router-dom";
import { profileStore } from "../../stores/profileStore";
export const Profile = () => {
  const { id } = useParams();
  const { isLoggedIn, accessToken } = userStore();
  const { firstName, lastName, phone, color, flower, important, image } =
    profileStore();
  const navigate = useNavigate();
  const fetchData = profileStore((state) => state.fetchProfile);
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li type="button" onClick={onLogoutClick}>
            Sign Out
          </li>
          <Link to={`/cart/${id}`}>Cart</Link>
          <br />
          <Link to={`/profile/${id}/edit`}>Edit Profile</Link>
        </ul>
      </nav>
      <div>
        <img src={image} alt="profile image" />
        <h1>last name: {lastName}</h1>
        <h1>first name:{firstName}</h1>
        <p>phone number:{phone}</p>
        <p>favourite color:{color}</p>
        <p>favourite flower:{flower}</p>
        <p>important day: {important}</p>
      </div>
    </div>
  );
};

export default Profile;
