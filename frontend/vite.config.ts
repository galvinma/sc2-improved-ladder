import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://sc2-improved-ladder-backend:5000",
    },
    watch: {
      usePolling: true,
    },
    host: true,
  },
});
