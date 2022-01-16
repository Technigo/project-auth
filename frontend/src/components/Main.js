import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { API_URL } from "../utils/url";
import user from "../reducers/user";

// import { RON_SWANSSON_URL } from "../utils/url";
import { MOVIE_URL } from "../utils/url";
// import order from "../reducers/order";

const Main = () => {
  const [movies, setMovies] = useState([]);
  // const [message, setMessage] = useState("");
  // const orderMessage = useSelector((store) => store.order.message);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  // useEffect(() => {
  //   fetchMovie();
  // }, []);

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

    // fetch(API_URL("order"), options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       dispatch(order.actions.setMessage(data.response));
    //       dispatch(order.actions.setError(null));
    //     } else {
    //       dispatch(order.actions.setMessage(null));
    //       dispatch(order.actions.setError(data.response));
    //     }
    //   });
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

// const List = ({ movies }) => {
//   return (
//     <>
//       <section className="full-page-container">
//         {movies.map((movie) => (
//           <Link to={`/details/${movie.id}`} key={movie.id}>
//             <img
//               className="movie-list-image"
//               src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
//               alt="{movie.title}"
//             />

//             <div className="movie-date-title-text-box">
//               <h1>{movie.title}</h1>
//               <p> Released:{movie.release_date}</p>
//             </div>
//           </Link>
//         ))}
//       </section>
//     </>
//   );
// };

// export default List;
// © 2022 GitHub, Inc.
