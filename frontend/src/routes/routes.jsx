import { Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Register } from "../components/Register";
import { Login } from "../components/Login";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </>
);

export default routes;
