import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Form } from 'components/Form';
import { Welcome } from 'components/Welcome';
import { Start } from 'components/Start';
import { NotFound } from 'components/NotFound';
import styled from "styled-components";

export const App = () => {
  return (
    <BrowserRouter>
      <StyledMain>
        <Routes>
          <Route path={"/"} element={<Start />} />
          <Route path={"/register"} element={
            <Form
              formType="register"
              formTitle="Enter details"
              buttonText="Register me!" />}
          />
          <Route path={"/login"} element={
            <Form
              formType="login"
              formTitle="User login "
              buttonText="Sign me in!" />}
          />
          <Route path={"/welcome"} element={<Welcome />} />
          <Route path={"/404"} element={<NotFound />} />
          <Route path={"*"} element={<Navigate to="/404" />} />
        </Routes>
      </StyledMain>
    </BrowserRouter>
  );
}

const StyledMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fdb49b;
  background-image: linear-gradient(0deg, #fdb49b 0%, #e197d2 100%);
`