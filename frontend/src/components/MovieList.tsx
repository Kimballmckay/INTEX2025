import { useEffect, useState } from "react";
import { MoviesTitle } from "../types/MoviesTitle";

function MovieList() {
    const [movies, setMovies] = useState<MoviesTitle[]>([]); // Holds the list of movies
    const [page, setPage] = useState(1); // Tracks the current page for pagination
    const [loading, setLoading] = useState(false); // To track if new data is being fetched
    const [hasMore, setHasMore] = useState(true); // Track if there are more movies to load

    // Fetch movies on component load or when the page changes
    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);

            // Log the current page for debugging
            console.log("Fetching page:", page);

            const response = await fetch(`https://localhost:5000/Movie/AllMovies?page=${page}`);
            const data = await response.json();

            // If there are no more movies, set hasMore to false
            if (data.length === 0) {
                setHasMore(false);
            }

            // Only add new movies if they are fetched successfully
            if (data.length > 0) {
                setMovies((prevMovies) => [...prevMovies, ...data]); // Append new movies
            }

            setLoading(false);
        };

        // Only fetch movies if there are more movies to load
        if (hasMore) {
            fetchMovies();
        }

    }, [page]); // Depend on the page number to trigger fetching

    // Scroll event handler to detect when the user reaches the bottom
    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

        // If we're at the bottom of the page, not already loading, and there are more movies
        if (bottom && !loading && hasMore) {
            setPage((prevPage) => prevPage + 1); // Increment the page number to load more movies
        }
    };

    // Add scroll event listener on component mount and clean it up on unmount
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading, hasMore]); // Depend on loading and hasMore state to manage event listener behavior

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
            {loading && <p>Loading...</p>} {/* Loading indicator */}
            {!hasMore && <p>No more movies to load</p>} {/* No more movies message */}
        </div>
    );
}

export default MovieList;
