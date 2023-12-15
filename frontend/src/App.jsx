// App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

