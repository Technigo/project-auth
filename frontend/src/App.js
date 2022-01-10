import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { combineReducers, createStore } from "@reduxjs/toolkit";

export const App = () => {
  // We need to change name to whatever out store/reducer is called. This is the local storage
  const reducer = combineReducers({
    name: name.reducer,
  });
  const persistedStateJSON = localStorage.getItem("nameReduxState");
  let persistedState = {};

  if (persistedStateJSON) {
    persistedState = JSON.parse(persistedStateJSON);
  }
  const store = createStore(reducer, persistedState);

  store.subscribe(() => {
    localStorage.setItem("nameReduxState", JSON.stringify(store.getState()));
  });

  return (
    <Router>
      <Link to="/">Start</Link>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
      {/* This route needs a name :P */}
      <Link to="/sessions">Secret riddles</Link>

      <Routes>
        <Route exact path="/">
          {/* here we put a component */}
        </Route>
        <Route path="/signin">{/* here we put a component */}</Route>
        <Route path="/signup">{/* here we put a component */}</Route>
        <Route path="/sessions">{/* here we put a component */}</Route>
      </Routes>
    </Router>
  );
};
