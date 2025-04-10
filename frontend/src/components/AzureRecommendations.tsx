import React, { useEffect, useState } from "react";
import axios from "axios";
import { MoviesTitle } from "../types/MoviesTitle";
import { fetchMoviesByShowIds } from "../api/MoviesAPI";

interface RatingInput {
  user_id: number;
  show_id: string;
  rating: number;
}

interface AzureRecommendationsProps {
  onRecommendations: (movies: MoviesTitle[]) => void;
}

const AzureRecommendations: React.FC<AzureRecommendationsProps> = ({
  onRecommendations,
}) => {
  const [error, setError] = useState<string | null>(null);

  const getAzureRecommendations = async () => {
    const userRatings: RatingInput[] = [
      { user_id: 88, show_id: "s8381", rating: 4 },
    ];

    try {
      const response = await axios.post(
        "https://localhost:5000/api/azurerecommendations/score",
        userRatings
      );
      const showIds: string[] = response.data;

      const movies = await fetchMoviesByShowIds(showIds);
      onRecommendations(movies);
    } catch (err) {
      setError("Failed to get recommendations.");
      console.error("Error fetching recommendations:", err);
    }
  };

  useEffect(() => {
    getAzureRecommendations();
  }, []);

  return <>{error && <p className="text-red-600 mt-2">{error}</p>}</>;
};

export default AzureRecommendations;
