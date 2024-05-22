import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RegistrationForm } from "./components/RegistrationForm";
import { LoginForm } from "./components/LoginForm";
import { UserPage } from "./components/UserPage";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<RegistrationForm />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/user-page" element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>

  )
};
