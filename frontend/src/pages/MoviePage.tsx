//security
import { useState } from "react";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import GenreFilter from "../components/GenreFilter";
import Logout from "../components/Logout";
import MovieBand from "../components/MovieBand";
import MovieList from "../components/MovieList";
import NavBar2 from "../components/NavBar2";

// add in fetch url {credentials:'include'}

function MoviePage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  return (
    <>
      <AuthorizeView>
        <NavBar2 />

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
              <MovieList selectedGenres={selectedGenres} />
            </div>
          </div>
        </div>
      </AuthorizeView>
    </>
  );
}

export default MoviePage;
