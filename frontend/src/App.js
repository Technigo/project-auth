import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from 'components/Home';
import Login from 'components/Login';
import Registration from 'components/Registration';
import Profile from 'components/Profile';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};
