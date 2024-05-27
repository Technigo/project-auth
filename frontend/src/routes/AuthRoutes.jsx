import { Routes, Route } from "react-router-dom"
import { SignUpForm } from "../components/SignUpForm/SignUpForm.jsx"
import { SignInForm } from "../components/SignInForm/SignInForm.jsx"
import { LoggedIn } from "../components/LoggedIn/LoggedIn.jsx"

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUpForm />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/loggedin" element={<LoggedIn />} />
    </Routes>
  )
}
