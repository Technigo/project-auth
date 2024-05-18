import { Route } from "react-router-dom";
import { Registration } from "../components/Registration";
import { SignIn } from "../components/SignIn";
import { AuthenticatedContent } from "../pages/AuthenticatedContent";
import { Home } from "../pages/Home";
import { PageNotFound } from "../pages/PageNotFound";

export const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Registration />} />

    <Route path="/signin" element={<SignIn />} />

    <Route path="*" element={<PageNotFound />} />

    <Route path="/authenticated" element={<AuthenticatedContent />} />
  </>
);
