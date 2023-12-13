
// src/App.js
import 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
};

export default App;
