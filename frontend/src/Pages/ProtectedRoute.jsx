import { Navigate, Outlet } from "react-router-dom";
import { userStore } from "../Stores/userStore";

export const ProtectedRoute = () => {
  const { isLoggedIn } = userStore();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
