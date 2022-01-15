import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "@reduxjs/toolkit";

import Main from "./components/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

import user from "./reducers/user";
// import thoughts from "./reducers/thoughts";

const reducer = combineReducers({
	user: user.reducer,
	// thoughts: thoughts.reducer,
});

const persistedStateJSON = localStorage.getItem("userReduxState");
let persistedState = {};

if (persistedStateJSON) {
	persistedState = JSON.parse(persistedStateJSON);
}

const store = createStore(reducer, persistedState);

store.subscribe(() => {
	localStorage.setItem("userReduxState", JSON.stringify(store.getState()));
});
export const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
