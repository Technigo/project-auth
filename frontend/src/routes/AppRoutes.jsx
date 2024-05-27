import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Protected from "../components/protected/Protected";
import Logout from "../components/auth/Logout";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
