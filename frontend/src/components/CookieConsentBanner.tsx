import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent"; // Import from your installed package
import { useNavigate } from "react-router-dom";

function CookieConsentBanner() {
  const navigate = useNavigate();
  const [consentGiven, setConsentGiven] = useState(false);

  // Check if user already consented on page load
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setConsentGiven(true);
    }
  }, []);

  // Handle consent acceptance
  const handleConsent = () => {
    localStorage.setItem("cookieConsent", "true");
    setConsentGiven(true);
    // Here, you can add your tracking scripts or cookies
    document.cookie =
      "userConsentGiven=true; path=/; max-age=" + 60 * 60 * 24 * 365; // 1 year
  };

  // Handle revoking consent (if needed)
  const handleRevokeConsent = () => {
    localStorage.setItem("cookieConsent", "false");
    setConsentGiven(false);
    // Remove user consent cookie and revoke any tracking
    document.cookie =
      "userConsentGiven=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Remove cookie
  };

  return (
    <div className="App">
      {/* Always render main content */}
      <h1>Welcome to our site!</h1>

      {/* Render Cookie Consent banner */}
      {!consentGiven && (
        <CookieConsent
          location="bottom"
          buttonText="I Agree"
          cookieName="userConsentGiven"
          style={{
            background: "#2B373B",
            color: "#fff",
            fontSize: "14px",
            textAlign: "center",
            padding: "10px",
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            zIndex: "9999",
          }}
          buttonStyle={{
            background: "#4CAF50",
            color: "#fff",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
          expires={365}
          onAccept={handleConsent}
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
      )}

      {/* Button to revoke consent if already given */}
      {consentGiven && (
        <button onClick={handleRevokeConsent} style={{ marginTop: "10px" }}>
          Revoke Consent
        </button>
      )}
    </div>
  );
}

export default CookieConsentBanner;
