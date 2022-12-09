import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Main from "./components/Main";
import NotFound from "./components/NotFound"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Main/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
