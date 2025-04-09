import { useNavigate, useParams } from "react-router-dom";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Logout from "../components/Logout";
import { MoviesTitle } from "../types/MoviesTitle";
import { useEffect, useState } from "react";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { show_id } = useParams();
  const [movie, setMovie] = useState<MoviesTitle | null>(null);

  useEffect(() => {
    fetch(`https://localhost:5000/Movie/${show_id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));
  }, [show_id]);

  if (!movie) return <div>Loading...</div>;

  const cleanTitle = movie.title.replace(/[^a-zA-Z0-9\s]/g, ""); // Removes special characters
  const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(cleanTitle)}.jpg`;
  return (
    //security
    // (
    //   <AuthorizeView>
    //     <span>
    //       <Logout>
    //         Logout
    //         <AuthorizedUser value="email" />
    //       </Logout>
    //     </span>
    //     {/* after we merge, we need to move authorize view to the bottom of the whole return */}
    //   </AuthorizeView>
    // ) > <div></div>

    <div style={{ color: "white" }}>
      <img
        src={imageUrl}
        alt={`${movie.title} poster`}
        width={200}
        height={300}
      />
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>{movie.genre}</p>
      <p>{movie.country}</p>
      <p>{movie.type}</p>
      <p>{movie.director}</p>
      <p>{movie.duration}</p>
      <p>{movie.rating}</p>
      <p>{movie.release_year}</p>
    </div>
  );
}

export default ProductDetailPage;
