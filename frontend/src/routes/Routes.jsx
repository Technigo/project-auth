import { Route } from "react-router-dom";
import { LandingPage } from "frontend/src/pages/LandingPage.jsx"
import { LoggedinPage } from "../pages/LoggedinPage";
 
export const routes = (
  <>
    <Route path="/" element={<LandingPage />}></Route>
    <Route path="/logged-In" element={<LoggedinPage />}></Route>
  </>
);
