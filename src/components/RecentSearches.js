import { useState, useEffect } from "react";

const RecentSearches = () => {
  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("savedSearches")) {
      const searches = JSON.parse(localStorage.getItem("savedSearches"));
      setSavedSearches(searches);
      console.log(savedSearches);
    }
  }, []);

  return (
    <div>
      {savedSearches && (
        <div>
          Recent searches{" "}
          {savedSearches.map((item) => {
            <p key={item}>{item}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default RecentSearches;
