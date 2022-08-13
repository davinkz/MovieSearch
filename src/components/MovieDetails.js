import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import apiRequest from "../utils/apiRequest";
import useFetch from "../utils/useEffect";

const MovieDetails = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [movie, setMovie] = useState(null);
  console.log(`id: ${id}`);

  useEffect(() => {
    fetch(process.env.REACT_APP_MOVIE_SEARCH_URL + "search-by-id/" + id)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.hasError) {
          setErrorMessage(data.error);
        } else {
          setMovie(data);
          console.log(movie);
        }
      })
      .catch((err) => setErrorMessage(err));
  }, []);

  return (
    <div>
      {errorMessage && <div className="text-red-600 p-4">{errorMessage}</div>}
      {movie && (
        <div className="flex p-5">
          <img src={movie.poster} />
          <div className="p-5">
            <h3 className="text-3xl text-orange-700">
              {movie.title} <small></small>
            </h3>
            <p className="mx-2 text-sm font-bold mb-5">{movie.rated}</p>
            <div className="font-italic mb-5">{movie.plot}</div>
            <p>
              <strong>Year</strong>: {movie.year}
            </p>
            <p>
              <strong>Genre</strong>: {movie.genre}
            </p>
            <p>
              <strong>Score</strong>: {movie.metascore}
            </p>
            <p>
              <strong>Actors</strong>: {movie.actors}
            </p>
            <p>
              <strong>Director</strong>: {movie.director}
            </p>
            <p className="mb-5">
              <strong>Rating</strong>: {movie.imdbRating}
            </p>

            <Link to="/" className="font-bold mt-5 text-blue-600">
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
