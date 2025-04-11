import { useNavigate, useParams } from "react-router-dom";
import { MoviesTitle } from "../types/MoviesTitle";
import { MovieSimilarity } from "../types/MovieSimilarity";
import { useEffect, useState } from "react";
import "../css/ProductDetailPage.css";
import NavBar2 from "../components/NavBar2";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movie, setMovie] = useState<MoviesTitle | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null);

  // Fetch movie data, average rating, and recommendations whenever show_id changes
  useEffect(() => {
    if (!show_id) return;

    // Reset userRating when movie changes
    setUserRating(null);

    // Fetch movie details
    fetch(
      `https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/Movie/${show_id}`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));

    // Fetch average rating
    fetch(
      `https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/GetAverageRating/${show_id}`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => setAverageRating(data))
      .catch((error) => console.error(error));

    // Fetch recommendations
    fetch(
      `https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/Recommendation/Recommend/${show_id}`,
      {
        credentials: "include",
      }
    )
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
          // Fallback to similar movies if no recommendations found
          fetch(
            `https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/MovieSimilarity/top5/${show_id}`,
            {
              credentials: "include",
            }
          )
            .then((res) => res.json())
            .then(async (similarMovies: MovieSimilarity[]) => {
              const titles: string[] = [];

              for (const item of similarMovies) {
                const res = await fetch(
                  `https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/Movie/${item.target_show_id}`,
                  {
                    credentials: "include",
                  }
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

    // Reset user rating from localStorage (if any) on new show_id
    const savedRating = localStorage.getItem(`rating_${show_id}`);
    if (savedRating) {
      setUserRating(parseInt(savedRating));
    }
  }, [show_id]); // Dependency on show_id to reset rating and fetch fresh data

  const handleStarClick = (rating: number) => {
    if (rating < 1 || rating > 5) {
      alert("Please select a rating between 1 and 5.");
      return;
    }
    setUserRating(rating);
    localStorage.setItem(`rating_${show_id}`, rating.toString());
    submitRating(rating);
  };

  const submitRating = (rating: number) => {
    if (!show_id) return;

    fetch(
      `https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/Movie/AddRating/${show_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
        credentials: "include",
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to submit rating");
        }
        return response.json();
      })
      .then((data) => {
        setAverageRating(data.averageRating);
      })
      .catch((error) => {
        console.error("Error submitting rating:", error.message);
        alert("There was a problem submitting your rating.");
      });
  };

  const handleRecommendationClick = async (title: string) => {
    try {
      const response = await fetch(
        `https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/Movie/titlelookup/${encodeURIComponent(title)}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error(
          `Error fetching show_id for title "${title}":`,
          response.status
        );
        return;
      }

      const data = await response.json();
      if (data?.show_id) {
        navigate(`/productdetail/${data.show_id}`);
      }
    } catch (error) {
      console.error("Error fetching show_id:", error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  const cleanTitle = (movie.title ?? "").replace(/[^a-zA-Z0-9\s]/g, "");
  const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`;

  return (
    <>
      <NavBar2 />

      <div style={{ color: "white", paddingTop: "140px" }}>
        <div
          className="d-flex flex-md-row flex-column align-items-start gap-4 mt-4"
          style={{ paddingLeft: "1%" }}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            ← Back
          </button>
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

          <div className="flex-grow-1" style={{ maxWidth: "50%" }}>
            <h1 className="mb-2">{movie.title}</h1>
            <p className="mb-3">
              {movie.rating} • {movie.duration} • {movie.release_year}
            </p>

            <p>
              <strong>Description:</strong> {movie.description}
            </p>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Country:</strong> {movie.country}
            </p>
            <p>
              <strong>Type:</strong> {movie.type}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>

            <p className="mb-2">
              <strong>Average Rating: </strong>
              {averageRating === 0
                ? "No ratings yet"
                : `${averageRating.toFixed(2)} ★`}
            </p>

            <div className="mb-3">
              <label htmlFor="star-rating">
                <strong>Your Rating:</strong>
              </label>
              <div
                id="star-rating"
                style={{ fontSize: "2rem", cursor: "pointer" }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    style={{
                      color:
                        userRating && star <= userRating
                          ? "#ffc107"
                          : "#e4e5e9",
                      transition: "color 0.2s",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4
            className="mb-3"
            style={{ paddingLeft: "12%", fontWeight: "bold" }}
          >
            Recommended
          </h4>
          {recommendations.length > 0 ? (
            <div className="d-flex  justify-content-center gap-4">
              {recommendations.map((title, index) => {
                const cleanRecTitle = title.replace(/[^a-zA-Z0-9\sñ]/g, "");
                const recImageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanRecTitle)}.jpg`;

                return (
                  <div
                    key={index}
                    className="movie-card d-flex flex-column align-items-center"
                    style={{ width: 200, cursor: "pointer", outline: "none" }}
                    onClick={() => handleRecommendationClick(title)}
                  >
                    <img
                      src={recImageUrl}
                      alt={`${title} poster`}
                      style={{
                        width: "100%",
                        height: "300px",
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
            </div>
          ) : (
            <p>No recommendations available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
