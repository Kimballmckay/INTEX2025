import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage() {
  // state variables for email and passwords
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);

  // state variable for error messages
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // handle change events for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setRememberme(checked);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/createaccount");
  };

  // handle submit event for the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginUrl = rememberme
      ? "https://localhost:5000/login?useCookies=true"
      : "https://localhost:5000/login?useSessionCookies=true";

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include", // ✅ Ensures cookies are sent & received
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Ensure we only parse JSON if there is content
      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      navigate("/competition");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Fetch attempt failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-content">
          {/* Logo can be added here */}
          {/* <img src="/logo.png" alt="CineNiche" className="login-logo" /> */}
          <h1 className="login-title">Sign In</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                className="login-input"
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="remember-me">
              <input
                className="remember-checkbox"
                type="checkbox"
                id="rememberme"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              <label className="remember-label" htmlFor="rememberme">
                Remember password
              </label>
            </div>

            <button className="login-button" type="submit">
              SIGN IN
            </button>

            <button
              className="create-account-button"
              type="button"
              onClick={handleCreateAccountClick}
            >
              CREATE ACCOUNT
            </button>
          </form>

          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
