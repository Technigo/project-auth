import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import Thoughts from "./components/Thoughts"
import Home from "./components/Home"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/thoughts" element={<Thoughts />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
