import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { movie, fetchMovies } from 'reducers/movie';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Jag flyttade koden för filminnehållet till en egen komponent så att app.js blir lite renare.
const reducer = combineReducers({
  movie: movie.reducer,
});

const store = configureStore({ reducer });

export const Movies = () => {
  const moviesList = useSelector((store) => store.movie.movieList);
  const dispatch = useDispatch();

  const onFetchMovies = () => {
    dispatch(fetchMovies());
  };

  useEffect(() => {
    onFetchMovies();
  });

  return (
    <Provider store={store}>
      <div>
        <h1>HELLO MOVIES</h1>
        {moviesList.map((movie) => (
          <div key={movie._id}>
            <p>{movie.title}</p>
            <p>{movie.release_year}</p>
          </div>
        ))}
      </div>
    </Provider>
  );
}