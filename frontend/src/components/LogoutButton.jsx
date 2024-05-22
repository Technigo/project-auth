import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <button className="full-width" onClick={logout}>
        Log out
      </button>
    </>
  );
};
