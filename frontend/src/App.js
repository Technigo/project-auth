import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "themeprovider/theme";
import NotFound from "pages/NotFound";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authenticated } from "./reducers/auth";
import { Provider } from "react-redux";

const reducer = combineReducers({
  authenticated: authenticated.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
};
