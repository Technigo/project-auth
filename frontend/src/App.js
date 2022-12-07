//API_URL: https://project-auth-fybh32gdwa-lz.a.run.app/
import React from 'react';
import { Register } from 'components/Register';
import { LogIn } from 'components/LogIn';
import { NotFound } from 'components/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InnerWrapper, OuterWrapper } from 'components/GlobalStyles';
import { Home } from 'components/Home';


export const App = () => {
  return (
  <BrowserRouter>
  <OuterWrapper> 
      <InnerWrapper>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<LogIn />} />
          <Route path="home" element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </InnerWrapper>
    </OuterWrapper>
  </BrowserRouter>
  );
}