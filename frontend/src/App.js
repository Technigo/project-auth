import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import NotFound from 'components/NotFound';
import { Provider } from 'react-redux';
import { OuterWrapper } from 'components/GlobalStyles';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thoughts from 'reducers/thoughts';
import user from 'reducers/user';
import { SignIn } from 'components/SignIn';
import Shapes from 'components/Shapes';


const reducer = combineReducers({
  user: user.reducer,
  thoughts: thoughts.reducer
});
const store = configureStore({reducer});
export const App = () => {
  return (
    <Provider store={store}>
    <OuterWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignIn/>}></Route>
          <Route path='/' element={<Main/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
      <Shapes />
      </OuterWrapper>
    </Provider>
      
  );
}

