import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import user from "../reducers/user";

import { MOVIE_URL } from "../utils/url";
import "./Main.css";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(MOVIE_URL, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMovies(json.results);
      }, []);
  }, [accessToken]);

  const handleRestart = () => {
    dispatch(user.actions.restart());
  };

  return (
    <>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="details">
              <h1>{movie.title}</h1>
              <p>Released {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleRestart}>logout</button>
      </div>
    </>
  );
};

export default Main;
