import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    react(),
    {
      name: "configure-csp-headers",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          res.setHeader(
            "Content-Security-Policy",
            "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; " +
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com https://accounts.google.com; " +
              "img-src 'self' data: https://movieimagesstorage.blob.core.windows.net; " + // Fixed CSP for Azure Blob Storage
              "frame-ancestors 'none'; " +
              "font-src 'self' fonts.gstatic.com data:; " +
              "connect-src 'self' https://localhost:5000 https://accounts.google.com https://oauth2.googleapis.com; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self'; " +
              "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;" // Allow OAuth login popups
          );
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    // Uncomment and configure CORS if needed
    // cors: {
    //   origin: 'http://localhost:3000',
    //   credentials: true, // :white_check_mark: Allow cookies for authentication
    // },
  },
});
