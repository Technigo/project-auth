import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Form } from 'components/Form';
import { Welcome } from 'components/Welcome';
import { Start } from 'components/Start';

export const App = () => {
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
    setauthenticated(loggedInUser);
    }
    }, []);
    
    if (!authenticated) {
      <Route path={"/"} element={<Start />} />
    } else {
      return (
        <Route path={"/welcome"} element={
          <Welcome />} />
      );
      }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Start />} />
        <Route path={"/register"} element={
          <Form 
          formType="register"
          buttonText="register"/>}
          />
        <Route path={"/login"} element={
          <Form 
          formType="login"
          buttonText="sign in"/>}
          />
        <Route path={"/welcome"} element={
        <Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}
