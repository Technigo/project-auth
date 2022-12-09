import React from 'react';
import Header from 'components/Header';
import LogIn from 'components/LogIn';
import Feed from 'components/Feed';
import NotFound from 'components/NotFound';
import { InnerWrapper, OuterWrapper } from 'components/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import user from 'reducers/user';
import posts from 'reducers/posts';


export const App = () => {
  const reducer = combineReducers({ 
    user: user.reducer,
    posts: posts.reducer 
  })
  const store = configureStore({ reducer })

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Header />
        <OuterWrapper>
          <InnerWrapper>
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/" element={<Feed />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </InnerWrapper>
        </OuterWrapper>
      </BrowserRouter>
    </Provider>
  );
}