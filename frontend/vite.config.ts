import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // security
    // headers: {
    // "Content-Security-Policy":
    // "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' 'fonts.googleapis.com' font-src 'self' 'fonts.gstatic.com' data:;",
    // },
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; " +
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com https://accounts.google.com; " +
        "img-src 'self' https://*.blob.core.windows.net; " + // ✅ Add Azure Blob support
        "font-src 'self' fonts.gstatic.com data:; " +
        "connect-src 'self' https://localhost:5000 https://accounts.google.com https://oauth2.googleapis.com; " +
        "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;",
    },

    cors: {
      origin: "http://localhost:3000",
      credentials: true, // ✅ Allow cookies for authentication
    },
  },
});
