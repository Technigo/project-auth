import { Route, Routes } from "react-router-dom";

import { Homepage } from "../components/Homepage";
import { Secrets } from "../components/Secrets";
import AuthForm from "../components/AuthForm";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<AuthForm />} />
      <Route path="/login" element={<AuthForm login={true} />} />
      <Route path="/secrets" element={<Secrets />} />
    </Routes>
  );
};
