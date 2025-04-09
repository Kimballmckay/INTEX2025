import { useEffect, useState } from "react";
import "./GenreFilter.css";

function GenreFilter({
  selectedGenres,
  setSelectedGenres,
}: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://localhost:5000/Movie/GetMovieGenres"
        );
        const data = await response.json();
        console.log("Fetched genres", data);
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };

    fetchGenres();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedGenres = selectedGenres.includes(target.value)
      ? selectedGenres.filter((g) => g !== target.value)
      : [...selectedGenres, target.value];

    const cleanedGenres = updatedGenres.map((g) => g.trim());

    setSelectedGenres(cleanedGenres);
  }

  return (
    <div className="genre-filter">
      <h5>Movie Genres</h5>
      <div className="genre-list">
        {genres.map((g) => (
          <div key={g} className="genre-item">
            <input
              type="checkbox"
              id={g}
              value={g}
              className="genre-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={g}>{g}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
