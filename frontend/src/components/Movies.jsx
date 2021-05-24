import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from 'reducers/movie';


// Jag flyttade koden för filminnehållet till en egen komponent så att app.js blir lite renare.


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
      <div>
        <h1>HELLO MOVIES</h1>
        {moviesList.map((movie) => (
          <div key={movie._id}>
            <p>{movie.title}</p>
            <p>{movie.release_year}</p>
          </div>
        ))}
      </div>
  );
}