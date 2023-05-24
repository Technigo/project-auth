import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from 'components/NotFound';
import Main from 'components/Main';
import Login from 'components/Login';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
import { Provider } from 'react-redux';

// Importing necessary components and libraries

export const App = () => {
    // Combining reducers for the Redux store

    // The `combineReducers` function from `@reduxjs/toolkit` is used
    // to combine multiple reducers into a single root reducer.
    // In this case, the `user` and `thoughts` reducers are combined to form the root reducer.
    const reducer = combineReducers({
        user: user.reducer,
        thoughts: thoughts.reducer
    });

    // Configuring the Redux store

    // The `configureStore` function from `@reduxjs/toolkit` is used to create the Redux store.
    // It takes the root reducer as an argument and returns a configured store.
    const store = configureStore({ reducer });

    // Rendering the application components and setting up routing

    return (
        <Provider store={store}>
            {/* Setting up the BrowserRouter for routing */}

            {/* The `BrowserRouter` component from `react-router-dom` is used to provide routing capabilities to the application.
          It wraps the entire component tree and enables navigation based on the URL paths. */}
            <BrowserRouter>
                {/* Defining routes for different paths */}
                <Routes>
                    {/* Route for the login page */}
                    <Route path='/login' element={<Login />} />
                    {/* Route for the main page */}
                    <Route path='/' element={<Main />} />
                    {/* Route for handling unknown paths */}
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

// Additional instructions for installing required dependencies

/// npm i react-redux
/// npm i @reduxjs/toolkit
/// npm i react-router-dom
