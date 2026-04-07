import { http, HttpResponse } from "msw";

export const handlers = [
  // LOGIN
  http.post("http://localhost:3000/api/auth/login", async () => {
    return HttpResponse.json({ token: "fake-token" });
  }),

  // GET CANDIDATES
  http.get("http://localhost:3000/api/candidates", async () => {
    return HttpResponse.json([
      { _id: "1", name: "Landry", email: "test@test.com" },
    ]);
  }),

  // CREATE
  http.post("http://localhost:3000/api/candidates", async () => {
    return HttpResponse.json({ success: true });
  }),

  // VALIDATE
  http.post(
    "http://localhost:3000/api/candidates/:id/validate",
    async () => {
      return HttpResponse.json({ success: true });
    }
  ),
];