import { useNavigate, useParams } from "react-router-dom";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Logout from "../components/Logout";
import { MoviesTitle } from "../types/MoviesTitle";
import { useEffect, useState } from "react";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movie, setMovie] = useState<MoviesTitle | null>(null);
  const [recommendations, setRecommendations] = useState<MoviesTitle[]>([]);

  useEffect(() => {
    fetch(`https://localhost:5000/Movie/${show_id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));
  }, [show_id]);

  useEffect(() => {
    fetch(`https://localhost:5000/Movie/recommend/${show_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        return response.json();
      })
      .then((data) => {
        // The backend should be returning an array of movie objects
        console.log("Recommendations data:", data); // Add this for debugging
        setRecommendations(data);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  }, [show_id]);

  const handleRecommendationClick = (recommendedShowId: string) => {
    navigate(`/movie/${recommendedShowId}`);
  };

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
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((recommendation) => (
              <li
                key={recommendation.show_id}
                onClick={() =>
                  handleRecommendationClick(recommendation.show_id)
                }
                style={{ cursor: "pointer" }}
              >
                {recommendation.title}{" "}
                {recommendation.release_year &&
                  `(${recommendation.release_year})`}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
