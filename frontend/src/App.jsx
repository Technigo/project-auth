import { RegistrationForm } from "./RegistrationForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Homepage } from "./Homepage"
import { Dashboard } from "./Dashboard"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<RegistrationForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/secrets" element={<Dashboard />} />
      </Routes>
      <RegistrationForm />
    </BrowserRouter>
  )
}
