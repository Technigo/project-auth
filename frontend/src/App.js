import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import Main from './components/Main';
import Signin from './components/Signin';
import NotFound from './components/NotFound';
import MainContainer from 'components/MainContainer';


import user from './reducers/user';
import profile from './reducers/profile';

const reducer = combineReducers({
	user: user.reducer,
	profile: profile.reducer,
});


const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}> 
      <MainContainer>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
      </MainContainer>
    </Provider>
  )
}
