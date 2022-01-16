import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from 'store';

import { Home } from 'Pages/Home';
import { Register } from 'Pages/Register';
import { Profile } from 'Pages/Profile';
import { NotFound } from 'Pages/NotFound';
import { Manga } from 'Pages/Manga';


export const App = () => {

  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
