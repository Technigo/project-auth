import { Route } from "react-router-dom";
import { LandingPage } from "../pages/LandingPage";
import { LogedInPage } from "../pages/LogedInPage";

export const routes = (
  <>
    <Route path="/" element={<LandingPage />}></Route>
    <Route path="/logged-in" element={<LogedInPage />}></Route>
  </>
);
