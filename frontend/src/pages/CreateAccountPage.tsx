import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateAccountPage.css";

function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      fetch("https://localhost:5000/createaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((data) => {
          console.log(data);
          if (data.ok) setError("Successful account creation. Please log in.");
          else setError("Error creating account.");
        })
        .catch((error) => {
          console.error(error);
          setError("Error creating account.");
        });
    }
  };

  return (
    <div className="create-container">
      <div className="create-card">
        <h1 className="create-title">Create Account</h1>
        <form onSubmit={handleSubmit} className="create-form">
          <input
            className="create-input"
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />

          <input
            className="create-input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />

          <input
            className="create-input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />

          <button className="create-button" type="submit">
            Register
          </button>

          <button
            className="go-login-button"
            type="button"
            onClick={handleLoginClick}
          >
            Go to Login
          </button>
        </form>
        {error && <p className="create-error">{error}</p>}
      </div>
    </div>
  );
}

export default CreateAccountPage;
