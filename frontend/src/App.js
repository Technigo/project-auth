import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { StartPage } from './pages/StartPage'
import { Dashboard } from './pages/Dashboard'
import { GlobalStyles } from 'assets/GlobalStyles';
import { NotFound } from './pages/NotFound';
import { LogInPage } from 'pages/LogInPage';
import { RegisterPage } from 'pages/RegisterPage';

export const App = () => {
  return (
    <><GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter></>
  );
}
