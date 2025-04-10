import "../css/NavBar.css"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="nav-left">
            <div className="logo">
              <img src="/images/Untitled design (1).png" alt="Logo" />
            </div>

            <div className="dropdown">
              <button className="watch-button">Watch</button>
              <div className="dropdown-content">
                <a href="#Movies">Movies</a>
                <a href="#TVShows">TV Shows</a>
                <a href="#Action">Action</a>
                <a href="#Adventure">Adventure</a>
                <a href="#Drama">Drama</a>
                <a href="#Comedy">Comedy</a>
                <a href="#Horror">Horror</a>
                <a href="#Fantasy">Fantasy</a>
                <a href="#Romance">Romance</a>
                <a href="#Animation">Animation</a>
                <a href="#Documentary">Documentary</a>
              </div>
            </div>
          </div>

          <div className="nav-right">
            <button className="nav-button" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button className="nav-button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
