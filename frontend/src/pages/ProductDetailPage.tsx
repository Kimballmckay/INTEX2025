import { useNavigate, useParams } from "react-router-dom";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Logout from "../components/Logout";
import { MoviesTitle } from "../types/MoviesTitle";
import { Recommendation } from "../types/Recommendation";
import { useEffect, useState } from "react";
import "../css/ProductDetailPage.css";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movie, setMovie] = useState<MoviesTitle | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Fetch movie details
    fetch(`https://localhost:5000/Movie/${show_id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));

    // Fetch recommendations based on show_id
    fetch(`https://localhost:5000/Recommendation/Recommend/${show_id}`)
      .then((response) => response.json())
      .then((data) => setRecommendations(data))
      .catch((error) => console.error(error));
  }, [show_id]);

  if (!movie) return <div>Loading...</div>;

  const cleanTitle = movie.title.replace(/[^a-zA-Z0-9\s]/g, ""); // Removes special characters
  const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`;

  return (
    <div style={{ color: "white" }}>
      <div className="d-flex flex-md-row flex-column align-items-start gap-4 mt-4">
        {/* Movie Poster */}
        <img
          src={imageUrl}
          alt={`${movie.title} poster`}
          width={300}
          height={450}
          style={{ borderRadius: "8px", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/200x300?text=No+Image";
          }}
        />

        {/* Movie Info */}
        <div className="flex-grow-1" style={{ minWidth: "300px" }}>
          <h1 className="mb-2">{movie.title}</h1>
          <p className="text-muted mb-3">
            {movie.rating} • {movie.duration} • {movie.release_year}
          </p>

          <p className="mb-2">
            <strong>Description:</strong> {movie.description}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="mb-2">
            <strong>Country:</strong> {movie.country}
          </p>
          <p className="mb-2">
            <strong>Type:</strong> {movie.type}
          </p>
          <p className="mb-2">
            <strong>Director:</strong> {movie.director}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-3">Recommended</h4>
        {recommendations && recommendations.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {[
              recommendations[0].recommendation1,
              recommendations[0].recommendation2,
              recommendations[0].recommendation3,
              recommendations[0].recommendation4,
              recommendations[0].recommendation5,
            ]
              .filter((title) => title)
              .map((title, index) => {
                const cleanRecTitle = title.replace(/[^a-zA-Z0-9\s]/g, "");
                const recImageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanRecTitle)}.jpg`;

                return (
                  <div
                    key={index}
                    className="movie-card d-flex flex-column align-items-center"
                    style={{ width: 200 }}
                  >
                    <img
                      src={recImageUrl}
                      alt={`${title} poster`}
                      style={{
                        width: "100%",
                        aspectRatio: "2/3",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/200x300?text=No+Image";
                      }}
                    />
                    <p
                      className="mt-2 text-center"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {title}
                    </p>
                  </div>
                );
              })}
          </div>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
