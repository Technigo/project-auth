import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { NotFound } from 'components/NotFound';
import { Login } from 'components/Login';
import { Main } from 'components/Main';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { user } from 'reducers/user'
import { thoughts } from 'reducers/thoughts';
import { Provider } from 'react-redux';


export const App = () => {
  
  const reducer = combineReducers({
    user: user.reducer,
    thoughts: thoughts.reducer
  });
  const store = configureStore({reducer})

  return (
    <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
     </BrowserRouter>
    </Provider>
  
  );
}


/// npm i (react-redux) (@reduxjs/toolkit) (react-router-dom)
