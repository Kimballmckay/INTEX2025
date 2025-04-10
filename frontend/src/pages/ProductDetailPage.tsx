import { useNavigate, useParams } from "react-router-dom";
import { MoviesTitle } from "../types/MoviesTitle";
import { Recommendation } from "../types/Recommendation";
import { useEffect, useState } from "react";
import "../css/ProductDetailPage.css";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movie, setMovie] = useState<MoviesTitle | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null); // State for storing user rating

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

    // Fetch average rating for the movie
    fetch(`https://localhost:5000/Movie/GetAverageRating/${show_id}`)
      .then((response) => response.json())
      .then((data) => setAverageRating(data))
      .catch((error) => console.error(error));
  }, [show_id]);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRating(Number(e.target.value));
  };

  const handleSubmitRating = () => {
    if (userRating === null || userRating < 1 || userRating > 5) {
      alert("Please select a valid rating between 1 and 5.");
      return;
    }

    fetch(`https://localhost:5000/Movie/AddRating/${show_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRating),
    })
      .then((response) => response.json())
      .then((data) => {
        setAverageRating(data.averageRating);
      })
      .catch((error) => console.error("Error submitting rating:", error));
  };

  if (!movie) return <div>Loading...</div>;

  const cleanTitle = movie.title.replace(/[^a-zA-Z0-9\s]/g, "");
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

          {/* Average Rating */}
          <p className="mb-2">
            <strong>Average Rating: </strong>
            {averageRating === 0 ? "No ratings yet" : (
              <>
                {averageRating.toFixed(2)} <span>★</span>
              </>
            )}
          </p>

          {/* Rating Input */}
          <div className="mb-3">
            <label htmlFor="rating">Rate this movie (1-5): </label>
            <input
              type="number"
              id="rating"
              value={userRating || ""}
              onChange={handleRatingChange}
              min={1}
              max={5}
            />
            <button onClick={handleSubmitRating}>Submit Rating</button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-3">Recommended</h4>
        {recommendations && recommendations.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {[recommendations[0].recommendation1, recommendations[0].recommendation2, recommendations[0].recommendation3, recommendations[0].recommendation4, recommendations[0].recommendation5]
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
                    <p className="mt-2 text-center" style={{ fontSize: "0.9rem" }}>
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
