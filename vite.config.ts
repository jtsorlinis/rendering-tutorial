import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
    };
  } else {
    return {
      base: "/rendering-tutorial/",
      plugins: [react()],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              konva: ["react-konva", "konva"],
            },
          },
        },
      },
    };
  }
});
