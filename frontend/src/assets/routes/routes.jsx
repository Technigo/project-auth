import { Route } from "react-router-dom";
import Registration from "../Pages/Registration";
import SignIn from "../Pages/SignIn";
import Home from "../Pages/Home";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/signin" element={<SignIn />} />
  </>
);

export default routes;
