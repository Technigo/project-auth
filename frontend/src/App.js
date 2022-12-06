import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/StartPage'
import { Dashboard } from './pages/Dashboard'
import { GlobalStyles } from 'assets/GlobalStyles';

export const App = () => {
  return (
    <><GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/404" replace />} /> */}
        {/* <div>
      Find me in src/app.js!
    </div> */}
      </Routes>
    </BrowserRouter></>
  );
}
