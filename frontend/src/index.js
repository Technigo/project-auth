import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
// import { Provider } from "react-redux";
// import { compose, createStore, combineReducers } from "@reduxjs/toolkit";
// import persistState from "redux-localstorage";
// import {authenticated} from './reducers/auth'

// const enhancer = compose(persistState());

// const reducer = combineReducers({
//   authenticated: authenticated.reducer
// })

// const store = createStore(reducer, enhancer)

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
        <App tab="home" />
        );
