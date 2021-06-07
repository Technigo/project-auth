import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';

import { thoughts } from './reducers/thoughts';
import { user } from './reducers/user';

import { Thoughts } from './components/Thoughts';
import { RegistrationForm } from './components/RegistrationForm';

const reducer = combineReducers({
	user: user.reducer,
	thoughts: thoughts.reducer,
});

const persistedStateJSON = localStorage.getItem('reduxState');
let persistedState = {};

if (persistedStateJSON) {
	persistedState = JSON.parse(persistedStateJSON);
}

const store = createStore(
	reducer,
	persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
	localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Provider store={store}>
					<Switch>
						<Route exact path='/' component={RegistrationForm} />
						<Route path='/registration' component={RegistrationForm} />
						<Route path='/thoughts' component={Thoughts} />
					</Switch>
				</Provider>
			</BrowserRouter>
		</>
	);
};
