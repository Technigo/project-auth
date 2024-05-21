import { RegistrationForm } from "./RegistrationForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Homepage } from "./Homepage"
import { Dashboard } from "./Dashboard"
import { Login } from "./Login"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/secrets" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
