import "../css/Footer.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const navigate = useNavigate(); // Initialize navigate here

  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; {new Date().getFullYear()} CineNiche</p>
        <div className="social-links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>

      <div className="footer-center">
        <img
          src="/images/Untitled design (1).png"
          alt="RetroStream Logo"
          className="footer-logo"
        />
      </div>

      <div className="footer-right">
        <button className="footer-button" onClick={() => navigate("/privacy")}>
          Privacy Policy
        </button>
      </div>
    </footer>
  );
}

export default Footer;
