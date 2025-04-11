import "../css/HomePage.css";
import { Carousel } from "react-bootstrap";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Logout from "../components/Logout";
import AzureRecommendations from "../components/AzureRecommendations";
import { MoviesTitle } from "../types/MoviesTitle";
import { useNavigate } from "react-router-dom";

function UserHomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<MoviesTitle[]>([]);
  const navigate = useNavigate();
  const movieCarouselRef = useRef<HTMLDivElement | null>(null);

  const toggleAnswer = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the answer if the same question is clicked
    } else {
      setActiveIndex(index); // Open the answer
    }
  };

  // Function to scroll the movie carousel (added from HomePage)
  const scrollCarousel = (direction: "left" | "right") => {
    if (movieCarouselRef.current) {
      const scrollAmount = movieCarouselRef.current.clientWidth * 0.8; // Scroll 80% of the visible width
      const scrollPosition =
        direction === "left"
          ? movieCarouselRef.current.scrollLeft - scrollAmount
          : movieCarouselRef.current.scrollLeft + scrollAmount;

      movieCarouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const carouselItems = [
    {
      title: "Discover What's Worth Watching",
      subtitle:
        "Smart recommendations tailored to your taste, bringing the golden age of film to your modern screen",
      image: "/images/netflix.jpg",
    },
    {
      title: "Lights, Camera, Nostalgia",
      subtitle: "Relive the golden age of film.",
      image: "/images/b9d8af7b-591c-4b02-9237-158b1a6f372d.jpg",
    },
    {
      title: "Streaming Classics in Hi-Fi",
      subtitle: "Retro vibes. Timeless cinema.",
      image: "/images/roma2.png",
    },
    {
      title: "Suggestions For You",
      subtitle: "Find Just What You're Looking For",
      image: "/images/brighterday.webp",
    },
    {
      title: "Everything You Need",
      subtitle: "Options For Every Taste",
      image: "/images/Untitled design (3).png",
    },
  ];

  const top10Movies = [
    "/images/Grand Hotel.jpg",
    "/images/Zion.jpg",
    "/images/Zenda.jpg",
    "/images/Young Tiger.jpg",
    "/images/Without Gorky.jpg",
    "/images/White Boy.jpg",
    "/images/Giri  Haji.jpg",
    "/images/Gelo.jpg",
    "/images/Flavors of Youth International Version.jpg",
    "/images/Fatima.jpg",
  ];

  const faqItems = [
    {
      question: "What is this service?",
      answer: "We stream retro films with hi-fi flavor and analog heart.",
    },
    {
      question: "How much does it cost?",
      answer: "Less than a vinyl record. Plans start at $4.99/month.",
    },
    {
      question: "Can I watch on any device?",
      answer: "Yep—TV, tablet, laptop, VHS (just kidding).",
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime via your account settings.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 7-day free trial for new users.",
    },
  ];

  return (
    <>
      <AuthorizeView>
        <div className="homepage">
          {/* HEADER CAROUSEL */}
          <section className="hero-carousel">
            <nav>
              <NavBar2 />
              <div className="logout-container">
                <Logout>
                  Logout
                  <AuthorizedUser value="email" />
                </Logout>
              </div>
            </nav>
            <Carousel controls={true} indicators={true} fade interval={4000}>
              {carouselItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <div className="carousel-background">
                    <img
                      src={item.image}
                      className="carousel-img"
                      alt="Slide"
                    />
                    <div className="carousel-overlay">
                      <div className="carousel-text">
                        <h1>{item.title}</h1>
                        <p>{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>

          {/* FIND SOMETHING NEW SECTION - Changed to match HomePage with carousel */}
          <section className="find-new">
            <h2>Find Something New</h2>
            <div className="movie-carousel-container">
              <button
                className="carousel-control prev"
                onClick={() => scrollCarousel("left")}
                aria-label="Previous movies"
              >
                &lt;
              </button>

              <div className="movie-carousel" ref={movieCarouselRef}>
                {top10Movies.map((src, idx) => (
                  <div className="movie-item" key={idx}>
                    <span className="ranking">{idx + 1}</span>
                    <img src={src} alt={`Top ${idx + 1}`} />
                  </div>
                ))}
              </div>

              <button
                className="carousel-control next"
                onClick={() => scrollCarousel("right")}
                aria-label="Next movies"
              >
                &gt;
              </button>
            </div>
          </section>

          {/* RECOMMENDATIONS SECTION - Adjusted for better fit */}
          <section className="recommendations">
            <h2>Just For You</h2>
            <AzureRecommendations onRecommendations={setRecommendedMovies} />
            {recommendedMovies.length > 0 && (
              <div className="movie-carousel-container">
                <button
                  className="carousel-control prev"
                  onClick={() => scrollCarousel("left")}
                  aria-label="Previous recommendations"
                >
                  &lt;
                </button>

                <div className="movie-carousel">
                  {recommendedMovies.map((movie, idx) => {
                    const cleanTitle = (movie.title ?? "").replace(
                      /[^a-zA-Z0-9\s]/g,
                      ""
                    );
                    const imageUrl = `https://movieimagesstorage.blob.core.windows.net/movieimages/Movie%20Posters/Movie%20Posters/${encodeURIComponent(
                      cleanTitle
                    )}.jpg`;

                    return (
                      <div
                        key={movie.show_id}
                        className="movie-item"
                        onClick={() =>
                          navigate(`/productdetail/${movie.show_id}`)
                        }
                      >
                        <span className="ranking">{idx + 1}</span>
                        <img src={imageUrl} alt={movie.title} />
                      </div>
                    );
                  })}
                </div>

                <button
                  className="carousel-control next"
                  onClick={() => scrollCarousel("right")}
                  aria-label="Next recommendations"
                >
                  &gt;
                </button>
              </div>
            )}
          </section>

          {/* MORE REASONS TO JOIN */}
          <section className="reasons-to-join">
            <h2>More Reasons to Join</h2>
            <div className="reason-cards">
              <div className="card">
                Options Tailored to You
                <div className="subtext">
                  Discover your next favorite movie effortlessly with our smart
                  filters and personalized recommendations.
                </div>
              </div>
              <div className="card">
                Endless Choices
                <div className="subtext">
                  Explore a vast library of movies and shows, from timeless
                  classics to the latest releases.
                </div>
              </div>
              <div className="card">
                Exclusive Access
                <div className="subtext">
                  Get early access to new releases and special screenings, just
                  for our members.
                </div>
              </div>
              <div className="card">
                Personalized Experience
                <div className="subtext">
                  Enjoy a viewing experience tailored to your preferences, with
                  recommendations you'll love.
                </div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="faq">
            <h2>Frequently Asked Questions</h2>
            <br />
            <br />
            {faqItems.map((faq, index) => (
              <div key={index} className="faq-card">
                <div
                  className="faq-question"
                  onClick={() => toggleAnswer(index)}
                >
                  <h5>{faq.question}</h5>
                  <div className="faq-plus-icon">+</div>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* FOOTER */}
          <div>
            <Footer />
          </div>
        </div>
      </AuthorizeView>
    </>
  );
}

export default UserHomePage;
