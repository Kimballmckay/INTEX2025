// NotAuthorizedPage.tsx
import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext<User | null>(null);

interface User {
  email: string;
  role: string; // Add the role to the user object
}

function UnauthorizedPage(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state
  let emptyuser: User = { email: "", role: "" };

  const [user, setUser] = useState(emptyuser);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);

        const contentType = response.headers.get("content-type");

        // Ensure response is JSON before parsing
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server");
        }

        const data = await response.json();

        // Check if the user has the "ADMIN" role
        if (data.email && data.role === "ADMIN") {
          setUser({ email: data.email, role: data.role });
          setAuthorized(true);
        } else {
          throw new Error("User is not authorized or does not have ADMIN role");
        }
      } catch (error) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry("https://localhost:5000/pingauth", {
      method: "GET",
      credentials: "include",
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null; // Prevents errors if context is null

  return props.value === "email" ? <>{user.email}</> : null;
}

export default UnauthorizedPage;
