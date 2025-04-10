import { useEffect, useRef, useState } from "react";
import "./GenreFilter.css";

function GenreFilter({
  selectedGenres,
  setSelectedGenres,
}: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/Movie/GetMovieGenres",
          {
            credentials: "include", // 👈 sends auth cookies for secure access
          }
        );
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedGenres = selectedGenres.includes(target.value)
      ? selectedGenres.filter((g) => g !== target.value)
      : [...selectedGenres, target.value];

    const cleanedGenres = updatedGenres.map((g) => g.trim());
    setSelectedGenres(cleanedGenres);
  }

  return (
    <div className="genre-filter" ref={dropdownRef}>
      <h5>Movie Genres</h5>
      <button
        className="dropdown-toggle"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <i className="bi bi-filter"></i>
        Select Genres
      </button>
      {dropdownOpen && (
        <div className="genre-dropdown">
          {genres.map((g) => (
            <div key={g} className="genre-item">
              <input
                type="checkbox"
                id={g}
                value={g}
                className="genre-checkbox"
                checked={selectedGenres.includes(g)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={g}>{g}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreFilter;
