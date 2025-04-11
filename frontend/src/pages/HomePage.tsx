import "../css/HomePage.css";
import { Carousel } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import CookieConsent from "react-cookie-consent";
// import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
// import Logout from "../components/Logout";

function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const movieCarouselRef = useRef<HTMLDivElement>(null);

  const toggleAnswer = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the answer if the same question is clicked
    } else {
      setActiveIndex(index); // Open the answer
    }
  };

  // Function to scroll the movie carousel
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
      title: "Streaming Classics in Hi-Fi",
      subtitle: "Retro vibes. Timeless cinema.",
      image: "/images/brighterday.webp",
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
      title: "Find Tailored Options Just for You!",
      subtitle: "Stop wasting time. Start streaming now.",
      image: "/images/netflix.jpg",
    },
    {
      title: "Watch It Like It's 1979",
      subtitle: "Old-school stories on demand.",
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
      answer:
        "We're a streaming platform dedicated to retro films—think cult classics, midnight movies, vintage sci-fi, and analog gems. Everything we stream is curated for lovers of hi-fi flavor and old-school charm, with an emphasis on grainy nostalgia and cinematic soul. Whether you're into drive-in horror flicks or ‘80s VHS rarities, this is your analog sanctuary in a digital world.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Our plans start at just $4.99/month—less than the price of a vinyl reissue or a large latte. For that, you get unlimited access to our hand-picked collection of retro films, themed collections, and exclusive content. No ads, no fluff—just pure vintage vibes.",
    },
    {
      question: "Can I watch on any device?",
      answer:
        "Yes! You can stream our films on your TV, laptop, tablet, or phone—any device with a modern browser or streaming app support. We optimize for all major platforms so your retro experience stays smooth. And while we don’t *really* support VHS, we love the spirit of it.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "We keep things drama-free. You can cancel your subscription anytime right from your account settings. No phone calls, no guilt trips, no secret menu options. Just a couple of clicks and you’re all set—though we’ll be sad to see you go.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Absolutely. New members get a 7-day free trial to explore our catalog and see if it vibes with their inner cinephile. No credit card games—just good old-fashioned film discovery. Cancel anytime during the trial and you won’t be charged a thing.",
    },
  ];

  return (
    <>
      {/* <AuthorizeView>
        <span>
          <Logout>
            Logout
            <AuthorizedUser value="email" />
          </Logout>
        </span> */}
      {/* HOME PAGE */}
      <div className="homepage">
        {/* HEADER CAROUSEL */}
        <section className="hero-carousel">
          <nav>
            <NavBar />
          </nav>
          <Carousel controls={true} indicators={true} fade interval={4000}>
            {carouselItems.map((item, index) => (
              <Carousel.Item key={index}>
                <div className="carousel-background">
                  <img src={item.image} className="carousel-img" alt="Slide" />
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

        {/* FIND SOMETHING NEW SECTION - Updated to be a horizontal carousel */}
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
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
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

        <CookieConsent
          location="bottom"
          buttonText="I Agree"
          cookieName="userConsentGiven"
          style={{ background: "#2B373B", color: "#fff", fontSize: "14px" }}
          buttonStyle={{
            background: "#4CAF50",
            color: "#fff",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          expires={365}
        >
          This website uses cookies to ensure you get the best experience on our
          website.{" "}
          <a
            href="/privacy-policy"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Learn more
          </a>
        </CookieConsent>
        {/* FOOTER */}
        <div>
          <Footer />
        </div>
      </div>
      {/* </AuthorizeView> */}
    </>
  );
}

export default HomePage;
