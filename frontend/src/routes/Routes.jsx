import { Route } from "react-router-dom";
import { StartPage } from "../pages/StartPage";
import { SecretPage } from "../pages/SecretPage";

export const routes = (
  <>
    <Route path="/" element={<StartPage />} />
    <Route path="/secrets" element={<SecretPage />} />
  </>
);
