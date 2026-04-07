import { http, HttpResponse } from "msw";

export const handlers = [
  // LOGIN
  http.post(`${import.meta.env.VITE_API_URL}/auth/login`, async () => {
    return HttpResponse.json({ token: "fake-token" }, { status: 200 });
  }),

  // GET CANDIDATES
  http.get(`${import.meta.env.VITE_API_URL}/candidates`, async () => {
    return HttpResponse.json([
      { _id: "1", name: "Landry", email: "test@test.com" },
    ], { status: 200 });
  }),

  // CREATE
  http.post(`${import.meta.env.VITE_API_URL}/candidates`, async () => {
    return HttpResponse.json({ success: true }, { status: 201 });
  }),

  // VALIDATE
  http.post(
    `${import.meta.env.VITE_API_URL}/candidates/:id/validate`,
    async () => {
      return HttpResponse.json({ success: true }, { status: 200 });
    }
  ),
];