import { useEffect, useState } from "react";

function GenreFilter() {
        const [genres, setGenres] = useState<string[]>([]);
        useEffect(() =>{
            const fetchGenres = async () => {
                try {
                const response = await fetch("https://localhost:5000/Movie/FilteredMovies");
                const data = await response.json();
                console.log('Fetched genres', data)
                setGenres(data);
            }
            catch (error){
                console.error("Error fetching genres", error);
            }
        }

            fetchGenres();
        }, []);
        return (
            <div>
                <h5>Movie Genres</h5>
                <div>
                    {genres.map((g) => (
                        <div key={g}>
                            <input type="checkbox" id={g} value={g} />
                            <label htmlFor={g}>{g}</label>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default GenreFilter;