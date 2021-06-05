import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { fetchMovies } from "reducers/movie";

const MovieContainer = styled.section`
  width: 100vw;  
  display: flex;
  flex-direction: flex-start;
  flex-wrap: wrap;
`;

const Movie = styled.div`
  border: 1px solid #7CA982;
  padding: 20px;
  margin: 10px;
`;


export const Movies = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((store) => store.movie.movieList);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
    
      <MovieContainer>
        {movieList.map((movie) => (
          <Movie key={movie._id}>
            <p>{movie.title}</p>
            <p>{movie.release_year}</p>
          </Movie>
        ))}
      </MovieContainer>
    </div>
  );
};
