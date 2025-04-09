import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
import UserHomePage from "./pages/UserHomePage";
import AuthorizeView from "./components/AuthorizeView";

library.add(faFacebook, faTwitter, faInstagram);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/managemovies" element={<ManageMoviesPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/productdetail" element={<ProductDetailPage />} />
          <Route
            path="/userhome"
            element={
              <AuthorizeView>
                <UserHomePage />
              </AuthorizeView>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
