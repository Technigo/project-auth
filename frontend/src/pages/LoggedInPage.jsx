import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "../../stores/userStore";

export const LoggedInPage = () => {
  const storeHandleLogOut = userStore((state) => state.handleLogOut);
  const { isLoggedIn } = userStore();
  const { fetchLoggedInData, loggedInData } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
    fetchLoggedInData();
    } else {
      alert("no permission");
      navigate("/register");
    }
  }, [isLoggedIn, fetchLoggedInData, navigate]);

  const onLogOutClick = () => {
    storeHandleLogOut();
    alert("log out successful");
    navigate("/");
  };

  return (
    <div>
      <h1>Hej</h1>
      <p>Data from /logged-in {loggedInData}</p>
      <button onClick={onLogOutClick}>Bye Log out</button>
    </div>
  );
};
