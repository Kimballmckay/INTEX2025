import { MoviesTitle } from "../types/MoviesTitle";

interface FetchMoviesResponse {
  movies: MoviesTitle[];
  totalNumMovies: number;
}

const API_URL = "https://localhost:5000/Movie";

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[]
): Promise<FetchMoviesResponse> => {
  try {
    console.log(selectedGenres);
    const genreParams = selectedGenres
      .map((cat) => `movieGenres=${encodeURIComponent(cat)}`)
      .join(`&`);

    let url = `${API_URL}/AllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedGenres.length ? `&${genreParams}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const addMovie = async (newMovie: MoviesTitle): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie", error);
    throw error;
  }
};

export const updateMovie = async (
  show_id: string,
  updatedMovie: MoviesTitle
): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${show_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteMovie = async (show_id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${show_id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
