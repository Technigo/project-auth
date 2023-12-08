import { Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Register } from "../Pages/Register";
import { Login } from "../Pages/Login";
import { NotFound } from "../Pages/NotFound";
import { ProtectedRoute } from "../Pages/ProtectedRoute";

const routes = (
  <>
    <Route path="/" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/home" element={<Home />} />
    </Route>
    <Route path="/users" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default routes;
