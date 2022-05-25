import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "themeprovider/theme";

// import { Provider } from "react-redux";
// import { compose, createStore, combineReducers } from "@reduxjs/toolkit";
// import persistState from "redux-localstorage";
// import {authenticated} from './reducers/auth'

// const enhancer = compose(persistState());

// const reducer = combineReducers({
//   authenticated: authenticated.reducer
// })

// const store = createStore(reducer, enhancer)

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
