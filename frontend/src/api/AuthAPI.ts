export async function getCurrentUser() {
  const response = await fetch(
    "https://cineniche-backend-hxb3ewa5e5b3dwhj.eastus-01.azurewebsites.net/api/account/CurrentUser",
    {
      credentials: "include", // Important for sending cookies
    }
  );

  if (!response.ok) return null;

  return await response.json();
}
