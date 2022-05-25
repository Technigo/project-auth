import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/countdown' element={<Countdown />} />
      </Routes>
    </BrowserRouter>
  );
};
