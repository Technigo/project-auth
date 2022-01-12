import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import user from "./reducers/user";
import Main from "./components/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { ui } from "./reducers/ui";
import userprofile from "./reducers/userprofile";

const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  userprofile: userprofile.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
