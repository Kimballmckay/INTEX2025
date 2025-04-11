export async function getCurrentUser() {
  const response = await fetch(
    "https://localhost:5000/api/account/CurrentUser",
    {
      credentials: "include", // Important for sending cookies
    }
  );

  if (!response.ok) return null;

  return await response.json();
}
