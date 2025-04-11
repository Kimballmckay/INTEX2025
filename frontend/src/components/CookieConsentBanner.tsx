import { useEffect, useState } from "react";

function CookieConsentBanner() {
  // Track whether the user has given consent (null if undecided)
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has made a decision on cookie consent
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      setConsentGiven(true); // User accepted cookies
    } else if (consent === "false") {
      setConsentGiven(false); // User rejected cookies
    }
  }, []);

  const handleAccept = () => {
    // Store that the user accepted cookies
    localStorage.setItem("cookieConsent", "true");
    setConsentGiven(true); // Update state to reflect user's choice
    document.cookie =
      "userConsentGiven=true; path=/; max-age=" + 60 * 60 * 24 * 365; // Set cookie for 1 year
    console.log("Cookies Accepted: ", document.cookie);
  };

  const handleReject = () => {
    // Store that the user rejected cookies
    localStorage.setItem("cookieConsent", "false");
    setConsentGiven(false); // Update state to reflect user's choice
    document.cookie =
      "userConsentGiven=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Delete cookie
    console.log("Cookies Rejected: ", document.cookie);
  };

  const handleRevokeConsent = () => {
    // Allow the user to revoke their consent and reset their choice
    localStorage.removeItem("cookieConsent");
    setConsentGiven(null); // Reset state to undecided
    document.cookie =
      "userConsentGiven=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Delete cookie
    console.log("Consent Revoked: ", document.cookie);
  };

  return (
    <div className="App">
      <h1>Welcome to our site!</h1>

      {/* Show banner only if consent is undecided */}
      {consentGiven === null && (
        <div
          style={{
            background: "#2B373B",
            color: "#fff",
            padding: "20px",
            position: "fixed",
            bottom: "0",
            width: "100%",
            zIndex: "9999",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ marginBottom: "10px", maxWidth: "75%" }}>
            This website uses cookies to ensure you get the best experience.{" "}
            <a
              href="/privacy-policy"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Learn more
            </a>
          </div>
          <div>
            <button
              onClick={handleAccept}
              style={{
                background: "#4CAF50",
                color: "#fff",
                padding: "10px 20px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              style={{
                background: "#f44336",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Button to change consent later (if decision is made) */}
      {consentGiven !== null && (
        <button
          onClick={handleRevokeConsent}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#eee",
            cursor: "pointer",
          }}
        >
          Update Cookie Preferences
        </button>
      )}
    </div>
  );
}

export default CookieConsentBanner;
