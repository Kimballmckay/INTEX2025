import { useEffect, useState } from "react";
import { MoviesTitle } from "../types/MoviesTitle";

function MovieList() {
    const [movies, setMovies] = useState<MoviesTitle[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
        const response = await fetch("https://localhost:5000/Movie/AllMovies");
        const data = await response.json();
        setMovies(data);
    };

    fetchMovies();
}, []);



  return (
    <>
        <h1>Movie List</h1>
        <br />
        {movies.map((m) => (
        <div id="movieCard">
            <h3>{m.title}</h3>
            <ul>
                <li>Type: {m.type}</li>
                <li>Director: {m.director}</li>
                <li>Cast: {m.cast}</li>
                <li>Country: {m.country}</li>
                <li>Release year: {m.release_year}</li>
                <li>Rating: {m.rating}</li>
                <li>Duration: {m.duration}</li>
                <li>Description: {m.description}</li>
            </ul>
        </div>
    ))}

    <br/>
    <label> 
        Results Per Page:
        <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    </label>
    </>
  );
}

export default MovieList;