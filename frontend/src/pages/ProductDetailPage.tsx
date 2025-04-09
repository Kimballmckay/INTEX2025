import { useNavigate, useParams } from "react-router-dom";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Logout from "../components/Logout";
import { MoviesTitle } from "../types/MoviesTitle";
import { Recommendation } from "../types/Recommendation";
import { useEffect, useState } from "react";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movie, setMovie] = useState<MoviesTitle | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation | null>(
    null
  );

  useEffect(() => {
    // Fetch movie details
    fetch(`https://localhost:5000/Movie/${show_id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));

    // Fetch recommendations based on show_id
    fetch(`https://localhost:5000/Recommendations/Recommend/${show_id}`)
      .then((response) => response.json())
      .then((data) => setRecommendations(data))
      .catch((error) => console.error(error));
  }, [show_id]);

  if (!movie) return <div>Loading...</div>;

  const cleanTitle = movie.title.replace(/[^a-zA-Z0-9\s]/g, ""); // Removes special characters
  const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`;

  return (
    <div style={{ color: "white" }}>
      <img
        src={imageUrl}
        alt={`${movie.title} poster`}
        width={200}
        height={300}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/200x300?text=No+Image";
        }}
      />
      <h1>{movie.title}</h1>
      <p>{movie.rating}</p>
      <p>{movie.duration}</p>
      <p>{movie.release_year}</p>
      <p>{movie.description}</p>
      <p>{movie.genre}</p>
      <p>{movie.country}</p>
      <p>{movie.type}</p>
      <p>{movie.director}</p>

      <div>
        <h4>Recommended</h4>
        {recommendations ? (
          <ul>
            <li>{recommendations.recommendation1}</li>
            <li>{recommendations.recommendation2}</li>
            <li>{recommendations.recommendation3}</li>
            <li>{recommendations.recommendation4}</li>
            <li>{recommendations.recommendation5}</li>
          </ul>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
