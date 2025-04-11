import { useEffect, useState } from "react";
import { MoviesTitle } from "../types/MoviesTitle";
import { fetchMovies } from "../api/MoviesAPI";
import "./MovieList.css";
import { useNavigate } from "react-router-dom";

function MovieList({
  selectedGenres,
  searchQuery,
}: {
  selectedGenres: string[];
  searchQuery: string;
}) {
  const [movies, setMovies] = useState<MoviesTitle[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  // When genres or search query change, reset movies list and pagination
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenres, searchQuery]);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const pageSize = 10;
        const data = await fetchMovies(
          pageSize,
          page,
          selectedGenres,
          searchQuery
        );

        if (data.movies.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prev) => [...prev, ...data.movies]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) {
      loadMovies();
    }
  }, [page, selectedGenres, hasMore, searchQuery]);

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="row">
      {movies.map((movie, index) => {
        const cleanTitle = (movie.title ?? "").replace(/[^a-zA-Z0-9\s]/g, ""); // Removes special characters
        const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`;

        return (
          <div
            key={`${movie.show_id}-${index}`}
            className="col-md-3 mb-3"
            id="movieCard"
            onClick={() => navigate(`/productdetail/${movie.show_id}`)}
          >
            <img
              src={imageUrl}
              alt={`${movie.title} poster`}
              width={200}
              height={300}
            />
            <h3>{movie.title}</h3>
          </div>
        );
      })}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more movies to load</p>}
    </div>
  );
}

export default MovieList;
