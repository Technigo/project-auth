import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LogIn } from './components/LogIn'
import { SignUp } from './components/SignUp'
import { Main } from 'components/Main';

export const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
  );
}

{/* <Route path="/404" element={<NotFound />} />
<Route path="*" element={<Navigate to="/404" />} /> */}