import { useState, useEffect } from "react";
import apiRequest from "../utils/apiRequest";
import SearchResult from "./SearchResult";

const MovieSearch = () => {
  const [apiError, setApiError] = useState("");
  const [isApiRequestLoading, setIsApiRequestLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedSearches, setSavedSearches] = useState([]);
  const [shouldShowRecentSearches, setShowShowRecentSearches] = useState(false);
  const [movie, setMovie] = useState(null);

  const handleSearch = async (e) => {
    const abc = localStorage.getItem("savedSearches")
      ? JSON.parse(localStorage.getItem("savedSearches"))
      : [];
    //console.log(`abc`, abc);
    setSavedSearches(abc);
    //console.log("savedSearches", savedSearches);
    setShowShowRecentSearches(savedSearches.length > 0);

    if (e.charCode != 13) return; // not an enter key that was pressed

    setShowShowRecentSearches(false);

    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) return; // no value to search

    try {
      // API call
      setIsApiRequestLoading(true);
      setApiError("");

      const response = await apiRequest(
        process.env.REACT_APP_MOVIE_SEARCH_URL + "search-by-title/" + value
      );
      setIsApiRequestLoading(false);

      setMovie(response);
      //console.log(movie);

      const searches = savedSearches;

      // limit searches to save to 5
      if (searches.length >= 5) {
        searches.shift(); // remove the first entry of the array
        searches.push(value); // add new value to top of the stack
      } else {
        const index = searches.findIndex((x) => x == value);
        if (index !== -1) {
          // remove this item from saved searches so it can be added back to the top of the stack
          searches.splice(index, 1);
        }
        searches.push(value); // add new value to top of the stack
      }
      setSavedSearches(searches);

      // save searched text in local storage
      localStorage.setItem("savedSearches", JSON.stringify(searches)); // remember the last searched queries
    } catch (err) {
      setIsApiRequestLoading(false);
      setApiError(err);
    }
  };

  const handSearchBoxBlur = () => {
    setShowShowRecentSearches(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl text-orange-800 m-4 font-bold text-center">
        Movie Search Engine
      </h1>

      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            placeholder="Search a movie by title and press the enter key"
            onKeyPress={handleSearch}
            onBlur={handSearchBoxBlur}
          />
        </div>
        {searchTerm && (
          <div>
            {movie && !movie.title
              ? movie.error
              : "Showing search for: " + searchTerm}
          </div>
        )}
        {shouldShowRecentSearches && (
          <div>
            <h5>Recent searches</h5>
            {savedSearches.join(", ")}
          </div>
        )}
      </div>

      <div className="mt-4">
        {movie && movie.title && <SearchResult movie={movie} />}
      </div>
    </div>
  );
};

export default MovieSearch;
