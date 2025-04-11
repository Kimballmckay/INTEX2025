import { useState } from "react";
import AuthorizeView from "../components/AuthorizeView";
import GenreFilter from "../components/GenreFilter";
import MovieBand from "../components/MovieBand";
import MovieList from "../components/MovieList";
import NavBar2 from "../components/NavBar2";

// add in fetch url {credentials:'include'}

function MoviePage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <AuthorizeView>
        <NavBar2 />

        <div
          className="container mt-4"
          style={{ color: "white", paddingTop: "140px" }}
        >
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
              <MovieList
                selectedGenres={selectedGenres}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </AuthorizeView>
    </>
  );
}

export default MoviePage;
