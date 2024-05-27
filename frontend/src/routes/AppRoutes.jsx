import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Protected from "../components/protected/Protected";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<Protected />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
