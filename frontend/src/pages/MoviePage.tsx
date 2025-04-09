import { useState } from "react";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import GenreFilter from "../components/GenreFilter";
import Logout from "../components/Logout";
import MovieBand from "../components/MovieBand";
import MovieList from "../components/MovieList";

// add in fetch url {credentials:'include'}

function MoviePage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      {/* //security (
      <AuthorizeView>
        <span>
          <Logout>
            Logout
            <AuthorizedUser value="email" />
          </Logout>
        </span> */}
      {/* after we merge, we need to move authorize view to the bottom of the whole return */}

      {/* </AuthorizeView>
      ) <div></div> */}
      <div className="container mt-4" style={{ color: "white" }}>
        <div className="row">
          <MovieBand />
        </div>
        <div className="row">
          <div className="col-md-3">
            <GenreFilter
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </div>
          <div className="col-md-9">
            {/* Add a search input */}
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control mb-4"
            />
            <MovieList selectedGenres={selectedGenres} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
