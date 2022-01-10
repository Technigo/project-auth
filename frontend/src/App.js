import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { combineReducers, createStore } from "@reduxjs/toolkit";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Riddles } from "./components/Riddles";

export const App = () => {
  // We need to change name to whatever out store/reducer is called. This is the local storage
  // const reducer = combineReducers({
  //   name: name.reducer,
  // });
  // const persistedStateJSON = localStorage.getItem("nameReduxState");
  // let persistedState = {};

  // if (persistedStateJSON) {
  //   persistedState = JSON.parse(persistedStateJSON);
  // }
  // const store = createStore(reducer, persistedState);

  // store.subscribe(() => {
  //   localStorage.setItem("nameReduxState", JSON.stringify(store.getState()));
  // });

  return (
    <Router>
      <Link to="/">Start</Link>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
      {/* This route needs a name :P */}
      <Link to="/sessions">Secret riddles</Link>

      <Routes>
        <Route index path="/" />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/sessions" element={<Riddles />} />
      </Routes>
    </Router>
  );
};
