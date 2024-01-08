import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userStore } from "../../stores/userStore";
import { useParams } from "react-router-dom";
import { profileStore } from "../../stores/profileStore";
import styles from "./profile.module.css";
import { Logo } from "../../components/logo/Logo";
import { format } from "date-fns";
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
      fetchData();
    }
  }, [isLoggedIn, accessToken, fetchData, navigate]);

  const onLogoutClick = async () => {
    alert("Log out successfull");
    navigate("/login");
  };
  const backClick = async () => {
    storeHandleLogout();
    navigate("/");
  };
  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className={styles.profile}>
      <nav>
        <ul className={styles.title}>
          <Link to="/" onClick={backClick}>
            Back
          </Link>
          <Logo />
          <li type="button" onClick={onLogoutClick}>
            Log Out
          </li>
        </ul>
        <img src={image} alt="profile image" className={styles.profile_image} />
        <ul className={styles.cart_profile}>
          <Link to={`/cart/${id}`}>Cart</Link>
          <br />
          <Link to={`/profile/${id}/edit`}>Edit Profile</Link>
        </ul>
      </nav>
      <div className={styles.info}>
        <h1>personal information:</h1>
        <div className={styles.text}>
          <p>
            last name <span>{lastName}</span>
          </p>

          <p>
            first name <span>{firstName}</span>
          </p>

          <p>
            phone number <span>{phone}</span>
          </p>
          <p>
            favourite color <span>{color}</span>
          </p>

          <p>
            favourite flower <span>{flower}</span>
          </p>
          <p>
            important day <span>{format(new Date(important), "dd-MM")}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
