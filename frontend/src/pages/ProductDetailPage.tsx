import { useNavigate, useParams } from "react-router-dom";
import { MoviesTitle } from "../types/MoviesTitle";
import { MovieSimilarity } from "../types/MovieSimilarity";
import { useEffect, useState } from "react";
import "../css/ProductDetailPage.css";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movie, setMovie] = useState<MoviesTitle | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    // Fetch movie details
    fetch(`https://localhost:5000/Movie/${show_id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));


    // Fetch recommendations based on show_id
    fetch(`https://localhost:5000/Recommendation/Recommend/${show_id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setRecommendations(data))
      .catch((error) => console.error(error));

    // Fetch average rating for the movie
    fetch(`https://localhost:5000/Movie/GetAverageRating/${show_id}`, {
      credentials: "include", // 👈 Add this
    })

      .then((response) => response.json())
      .then((data) => setAverageRating(data))
      .catch((error) => console.error(error));

    // First try collaborative recommendations
    fetch(`https://localhost:5000/Recommendation/Recommend/${show_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0 && data[0]?.recommendation1) {
          const titles = [
            data[0].recommendation1,
            data[0].recommendation2,
            data[0].recommendation3,
            data[0].recommendation4,
            data[0].recommendation5,
          ].filter((title) => !!title);
          setRecommendations(titles);
        } else {
          // Fallback to content-based
          fetch(`https://localhost:5000/MovieSimilarity/top5/${show_id}`)
            .then((res) => res.json())
            .then(async (similarMovies: MovieSimilarity[]) => {
              const titles: string[] = [];

              for (const item of similarMovies) {
                const res = await fetch(
                  `https://localhost:5000/Movie/${item.target_show_id}`
                );
                const movieData = await res.json();
                if (movieData?.title) {
                  titles.push(movieData.title);
                }
              }

              setRecommendations(titles);
            })
            .catch((err) => {
              console.error("Error fetching fallback recommendations:", err);
              setRecommendations([]);
            });
        }
      })
      .catch((err) => {
        console.error("Error fetching recommendations:", err);
      });
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
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setAverageRating(data.averageRating);
      })
      .catch((error) => console.error("Error submitting rating:", error));
  };

  const handleRecommendationClick = async (title: string) => {
    try {
      const response = await fetch(

        `https://localhost:5000/Movie/titlelookup/${encodeURIComponent(title)}`,
        {
          credentials: "include",
        }
      ); // New backend endpoint (see next step)

      if (!response.ok) {
        console.error(
          `Error fetching show_id for title "${title}":`,
          response.status
        );
        return;
      }
      const data = await response.json();
      if (data && data.show_id) {
        navigate(`/productdetail/${data.show_id}`);
      } else {
        console.error(`show_id not found for title "${title}"`);
      }
    } catch (error) {
      console.error("Error fetching show_id:", error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  const cleanTitle = movie.title.replace(/[^a-zA-Z0-9\s]/g, "");
  const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(
    cleanTitle
  )}.jpg`;

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
            e.currentTarget.style.display = "none";
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
            {averageRating === 0 ? (
              "No ratings yet"
            ) : (
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

      {/* Recommendations Section */}
      <div className="mt-4">
        <h4 className="mb-3">Recommended</h4>
        {recommendations.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center gap-4">

            {recommendations.map((title, index) => {
              const cleanRecTitle = title.replace(/[^a-zA-Z0-9\sñ]/g, "");
              const recImageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(
                cleanRecTitle
              )}.jpg`;

              return (
                <div
                  key={index}
                  className="movie-card d-flex flex-column align-items-center"
                  style={{ width: 200, cursor: "pointer" }}
                  onClick={() => handleRecommendationClick(title)}
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
                      e.currentTarget.style.display = "none";
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

            {[
              recommendations[0]?.recommendation1,
              recommendations[0]?.recommendation2,
              recommendations[0]?.recommendation3,
              recommendations[0]?.recommendation4,
              recommendations[0]?.recommendation5,
            ]

              .filter((title) => title)
              .map((title, index) => {
                const cleanRecTitle = title.replace(/[^a-zA-Z0-9\sñ]/g, "");

                const recImageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanRecTitle)}.jpg`;

                return (
                  <div
                    key={index}
                    className="movie-card d-flex flex-column align-items-center"
                    style={{ width: 200, cursor: "pointer" }}
                    onClick={() => handleRecommendationClick(title)}
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
                        e.currentTarget.style.display = "none"; // Just hide it
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
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
