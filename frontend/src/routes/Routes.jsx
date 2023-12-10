import { Route } from "react-router-dom";
import { LandingPage } from "../pages2/LandingPage";
import { LoggedinPage } from "../pages2/LoggedinPage";
 
export const routes = (
  <>
    <Route path="/" element={<LandingPage />}></Route>
    <Route path="/logged-In" element={<LoggedinPage />}></Route>
  </>
);
