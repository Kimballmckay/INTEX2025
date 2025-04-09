import { useEffect, useState } from "react";
import { MoviesTitle } from "../types/MoviesTitle";
import { deleteMovie, fetchMovies } from "../api/MoviesAPI";
import Pagination from "../components/Pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";
import "../css/ManageMoviesPage.css";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import { Nav } from "react-bootstrap";
import NavBar2 from "../components/NavBar2";

const ManageMoviesPage = () => {
  const [movies, setMovies] = useState<MoviesTitle[]>([]);
  const [pageSize, setPageSize] = useState<number>(50);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<MoviesTitle | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, [], "");
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (show_id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(show_id);
      setMovies(movies.filter((m) => m.show_id !== show_id));
    } catch (error) {
      alert("Failed to delete movie. Please try again.");
    }
  };

  const toggleExpand = (id: string | null) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const truncate = (text: string, length: number) =>
    text.length > length ? text.substring(0, length) + "..." : text;

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <AuthorizeView>
        <NavBar2 />
        {/* <Logout>
          Logout
          <AuthorizedUser value="email" />
        </Logout> */}
        <div className="manage-movies-page">
          <h1>Admin - Movies</h1>

          {!showForm && (
            <button className="add-movie-btn" onClick={() => setShowForm(true)}>
              Add Movie
            </button>
          )}

          {showForm && (
            <NewMovieForm
              onSuccess={() => {
                setShowForm(false);
                fetchMovies(pageSize, pageNum, [], "").then((data) =>
                  setMovies(data.movies)
                );
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {editingMovie && (
            <EditMovieForm
              movie={editingMovie}
              onSuccess={() => {
                setEditingMovie(null);
                fetchMovies(pageSize, pageNum, [], "").then((data) =>
                  setMovies(data.movies)
                );
              }}
              onCancel={() => setEditingMovie(null)}
            />
          )}

          <table className="movie-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Title</th>
                <th>Director</th>
                <th>Cast</th>
                <th>Country</th>
                <th>Release Year</th>
                <th>Rating</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Genre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.show_id}>
                  <td>{m.show_id}</td>
                  <td>{m.type}</td>

                  {/* Title */}
                  <td>
                    {m.title && (
                      <>
                        {expandedId === m.show_id + "_title" ? (
                          <>
                            <div className="expandable-content">{m.title}</div>
                            <div
                              className="show-more"
                              onClick={() => toggleExpand(null)}
                            >
                              Hide
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{truncate(m.title, 30)}</div>
                            {m.title.length > 30 && (
                              <div
                                className="show-more"
                                onClick={() =>
                                  toggleExpand(m.show_id + "_title")
                                }
                              >
                                Show More
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td>

                  <td>{m.director}</td>

                  {/* Cast */}
                  <td>
                    {m.cast && (
                      <>
                        {expandedId === m.show_id + "_cast" ? (
                          <>
                            <div className="expandable-content">{m.cast}</div>
                            <div
                              className="show-more"
                              onClick={() => toggleExpand(null)}
                            >
                              Hide
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{truncate(m.cast, 40)}</div>
                            {m.cast.length > 40 && (
                              <div
                                className="show-more"
                                onClick={() =>
                                  toggleExpand(m.show_id + "_cast")
                                }
                              >
                                Show More
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td>

                  <td>{m.country}</td>
                  <td>{m.release_year}</td>
                  <td>{m.rating}</td>
                  <td>{m.duration}</td>

                  {/* Description */}
                  <td>
                    {m.description && (
                      <>
                        {expandedId === m.show_id + "_desc" ? (
                          <>
                            <div className="expandable-content">
                              {m.description}
                            </div>
                            <div
                              className="show-more"
                              onClick={() => toggleExpand(null)}
                            >
                              Hide
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{truncate(m.description, 50)}</div>
                            {m.description.length > 50 && (
                              <div
                                className="show-more"
                                onClick={() =>
                                  toggleExpand(m.show_id + "_desc")
                                }
                              >
                                Show More
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td>

                  {/* Genre */}
                  <td>
                    {m.genre && (
                      <>
                        {expandedId === m.show_id + "_genre" ? (
                          <>
                            <div className="expandable-content">{m.genre}</div>
                            <div
                              className="show-more"
                              onClick={() => toggleExpand(null)}
                            >
                              Hide
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{truncate(m.genre, 30)}</div>
                            {m.genre.length > 30 && (
                              <div
                                className="show-more"
                                onClick={() =>
                                  toggleExpand(m.show_id + "_genre")
                                }
                              >
                                Show More
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => setEditingMovie(m)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(m.show_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPageNum(1);
            }}
          />
        </div>
      </AuthorizeView>
    </>
  );
};

export default ManageMoviesPage;
