import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const loginUrl = rememberme
      ? "https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/login?useCookies=true"
      : "https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/login?useSessionCookies=true";

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || "Invalid email or password.");
      }

      navigate("/userhome");
    } catch (error: any) {
      setError(error.message || "Error logging in.");
      console.error("Fetch attempt failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-card-content">
            {/* Optional logo */}
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

              <button
                className="create-account-button"
                type="button"
                onClick={() => navigate(-1)}
              >
                BACK
              </button>
            </form>

            {error && <p className="login-error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
