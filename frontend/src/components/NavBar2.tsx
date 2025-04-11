import { useContext } from "react";
import "../css/NavBar2.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./AuthorizeView";

function NavBar2() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // Make a request to your logout endpoint
      await fetch("https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  let usernamePart = "";
  if (user?.email && typeof user.email === "string") {
    usernamePart = user.email.split("@")[0];
  } else if (user) {
    usernamePart = "User";
  }

  return (
    <div className="App">
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
              {user ? (
                <div className="user-controls">
                  <span className="username">Welcome {usernamePart}!</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar2;
