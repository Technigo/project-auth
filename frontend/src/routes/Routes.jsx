import { Route } from "react-router-dom";
import { StartPage } from "../pages/StartPage";
import { SecretPage } from "../pages/SecretPage";

// Shows a list of all routes in the app
export const routes = (
  <>
    <Route path="/" element={<StartPage />} />
    <Route path="/secrets" element={<SecretPage />} />
  </>
);
