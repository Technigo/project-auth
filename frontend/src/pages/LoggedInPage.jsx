import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/userStore";

export const LoggedInPage = () => {
  const storeHandleLogOut = userStore((state) => state.handleLogOut);
  const { isLoggedIn } = userStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    alert("no permission");
    navigate("/register");
  }

  const onLogOutClick = () => {
    storeHandleLogOut();
    alert("log out successful");
    navigate("/");
  };

  return (
    <div>
      <h1>Hej</h1>
      <button onClick={onLogOutClick}>Bye Log out</button>
    </div>
  );
};
