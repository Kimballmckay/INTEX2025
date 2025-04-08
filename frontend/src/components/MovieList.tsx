import { useEffect, useState } from "react";
import { MoviesTitle } from "../types/MoviesTitle";

function MovieList() {
    const [movies, setMovies] = useState<MoviesTitle[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:5000/Movie/AllMovies?pageNum=${page}`);
                const data = await response.json();
                if (data.movies.length === 0) {
                    setHasMore(false);
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...data.movies]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
            setLoading(false);
        };

        if (hasMore) {
            fetchMovies();
        }
    }, [page]);

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
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
            <h1>Movie List</h1>
            {movies.map((movie) => (
                <div key={movie.show_id} id="movieCard">
                    <h3>{movie.title}</h3>
                    <ul>
                        <li>Genre: {movie.genre}</li>
                    </ul>
                </div>
            ))}
            {loading && <p>Loading...</p>}
            {!hasMore && <p>No more movies to load</p>}
        </div>
    );
}

export default MovieList;
