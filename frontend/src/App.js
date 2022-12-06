import React from 'react';
import Header from 'components/Header';
import Register from 'components/Register';
import LogIn from 'components/LogIn';
import { InnerWrapper, OuterWrapper } from 'components/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <OuterWrapper>
        <InnerWrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="login" element={<LogIn />} />
          </Routes>
        </InnerWrapper>
      </OuterWrapper>
    </BrowserRouter>
  );
}
