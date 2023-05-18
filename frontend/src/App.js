import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FirstPage } from 'components/FirstPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
      </Routes>
    </BrowserRouter>
  );
}
