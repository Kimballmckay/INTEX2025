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
