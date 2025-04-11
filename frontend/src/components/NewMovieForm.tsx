import { useState } from "react";
import { MoviesTitle } from "../types/MoviesTitle";
import { addMovie } from "../api/MoviesAPI";

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<MoviesTitle>({
    show_id: "",
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    release_year: 2025,
    rating: "",
    duration: "",
    description: "",
    genre: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Director:
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
      </label>
      <label>
        Cast:
        <input
          type="text"
          name="cast"
          value={formData.cast}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </label>
      <label>
        Release Year:
        <input
          type="number"
          name="release_year"
          value={formData.release_year}
          onChange={handleChange}
          min={1870}
          max={2030}
        />
      </label>
      <label>
        Rating:
        <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </label>
      <label>
        Duration:
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Movie</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewMovieForm;
