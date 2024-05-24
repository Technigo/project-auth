import { Route, Routes } from "react-router-dom"

import { Homepage } from "../components/Homepage";
import { LoginForm } from "../components/LoginForm";
import { Secrets } from "../components/Secrets"
import { SignupForm } from "../components/SignupForm";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/secrets" element={<Secrets />} />
    </Routes>
  );
}