import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import ManageMoviesPage from "./pages/ManageMoviesPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faTwitter, faInstagram);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/CreateAccount" element={<CreateAccountPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/ManageMovies" element={<ManageMoviesPage />} />
          <Route path="/Privacy" element={<PrivacyPage />} />
          <Route path="/ProductDetailPage" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
