import "../css/NavBar.css"; // Make sure this path is correct

function NavBar() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src="/images/Cine.svg" alt="Logo" />
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

        <div className="login">
          <button>Login</button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
