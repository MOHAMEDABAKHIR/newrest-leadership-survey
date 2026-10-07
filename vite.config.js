import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En production, Vercel route /api/* vers les functions.
// En local, pour tester l'API sans `vercel dev`, on peut utiliser `vercel dev`.
// `vite dev` ne sert QUE le frontend : le POST /api/responses renverra 404.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});