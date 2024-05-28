import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Registration } from "../components/Registration.jsx";
import { Login } from "../components/Login.jsx";
import { Home } from "../components/Home.jsx";
import { Dashboard } from "../components/Dashboard.jsx";
import { ProtectedRoute } from '../components/ProtectedRoutes.jsx';
import { Admin } from '../components/Admin.jsx';

export const AppRoutes = () => {


  return (
    <Router>
      <Routes>
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} fallbackComponent={<Dashboard />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} fallbackComponent={<Home />} />
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>

  )
};
