import { useEffect, useState } from "react";
import { MoviesTitle } from "../types/MoviesTitle";
import { fetchMovies } from "../api/MoviesAPI";

function MovieList({ selectedGenres }: { selectedGenres: string[] }) {
  const [movies, setMovies] = useState<MoviesTitle[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // When genres change, reset movies list and pagination
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenres]);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const pageSize = 10;
        const data = await fetchMovies(pageSize, page, selectedGenres);

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
  }, [page, selectedGenres, hasMore]);

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
    <div>
      {movies.map((movie, index) => {
        const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(movie.title!)}.jpg`;

        return (
          <div key={`${movie.show_id}-${index}`} id="movieCard">
            <h3>{movie.title}</h3>
            <img
              src={imageUrl}
              alt={`${movie.title} poster`}
              width={200}
              height={300}
            />
            <ul>
              <li>Genre: {movie.genre}</li>
            </ul>
          </div>
        );
      })}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more movies to load</p>}
    </div>
  );
}

export default MovieList;
