import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",

  use: {
    baseURL: "https://frontend-gestion-candidat.onrender.com",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});