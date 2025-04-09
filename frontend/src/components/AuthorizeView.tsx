import React, { useState, useEffect, createContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface User {
  email: string;
}

const UserContext = createContext<User | null>(null); // Ensure the context is typed properly

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await fetch("https://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login"); // Navigate to the login page after logging out
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to log out.");
    }
  };

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);
        const contentType = response.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server");
        }

        const data = await response.json();

        if (data.email) {
          setUser({ email: data.email });
          setAuthorized(true);
        } else {
          throw new Error("Invalid user session");
        }
      } catch (error: any) {
        setError(error.message || "Failed to authenticate.");
        setAuthorized(false);
        handleLogout(); // Automatically log out if authentication fails
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry(`https://localhost:5000/pingauth?ts=${Date.now()}`, {
      method: "GET",
      credentials: "include",
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (authorized && user) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export { UserContext }; // Export the context so it can be used in other components

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null;

  return props.value === "email" ? <>{user.email}</> : null;
}

export default AuthorizeView;
