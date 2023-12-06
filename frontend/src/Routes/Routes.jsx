import { Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Register } from "../Pages/Register";
import { Login } from "../Pages/Login";
import { NotFound } from "../Pages/NotFound";

const routes = (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/sessions" element={<Home />} />
    <Route path="/users" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
