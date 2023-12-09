// routes.js
import { Route } from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { LoggedInPage } from "../pages/LoggedInPage";
// import { NotFound } from "../pages/NotFound";

const routes = (
  <>
    <Route path="/" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/logged-in" element={<LoggedInPage />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </>
);

export default routes;
