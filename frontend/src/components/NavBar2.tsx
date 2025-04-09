import "../css/NavBar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { UserContext } from "./AuthorizeView"; // Import UserContext properly
import Logout from "./Logout";
import { AuthorizedUser } from "./AuthorizeView";

function NavBar2() {
  const navigate = useNavigate();
  // const user = useContext(UserContext); // Access UserContext

  const handleLogout = async () => {
    try {
      // Make a request to your logout endpoint
      await fetch("https://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      // Redirect to login page after logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/Untitled design (1).png" alt="Logo" />
        </div>

        <div className="dropdown">
          <button className="dropbtn">Watch</button>
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

        {/* {user ? (
          <div className="user-controls"> */}
        {/* <span className="username">Welcome {user.email}!</span>{" "} */}
        {/* Use email instead of username */}
        <div>
          <Logout>
            Logout
            <AuthorizedUser value="email" />
          </Logout>
        </div>
        {/* ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )} */}
      </nav>
    </div>
  );
}

export default NavBar2;
