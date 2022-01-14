import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { combineReducers, createStore } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { users } from "../src/reducers/users";

import { SignIn } from "./components/SignIn";
import { Riddles } from "./components/Riddles";
import { NotFound } from "./components/NotFound";
import { Start } from "./components/Start";
import { Header } from "./components/Header";

const reducer = combineReducers({
  users: users.reducer,
});

const store = configureStore({ reducer });

// To change from configure store to create when we want to add local storage
// const persistedStateJSON = localStorage.getItem("nameReduxState");
// let persistedState = {};

// if (persistedStateJSON) {
//   persistedState = JSON.parse(persistedStateJSON);
// }

// store.subscribe(() => {
//   localStorage.setItem("nameReduxState", JSON.stringify(store.getState()));
// });

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Start />} />
          <Route index path="*" element={<NotFound />} />
          <Route path="/signin" element={<SignIn />} />

          {/* commented out riddles as it's empty for now */}
          <Route path="/riddles" element={<Riddles />} />
        </Routes>
      </Router>
    </Provider>
  );
};
