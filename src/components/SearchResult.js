import { Link } from "react-router-dom";

const SearchResult = (data) => {
  console.log("details");
  const movie = data.movie ? data.movie : data;
  return (
    <Link to={`/movie/${movie.imdbID}`} className="m-4">
      <h3 className="font-bold text-2xl text-orange-600">{movie.title}</h3>
      <p className="flex justify-between">
        <span>
          <strong>Genre</strong>: {movie.genre}
        </span>
        <span>
          <strong>Released</strong>: {movie.released}
        </span>
      </p>
    </Link>
  );
};

export default SearchResult;
