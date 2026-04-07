import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Candidates from "./Candidates";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";

const renderWithProviders = (ui: React.ReactElement) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <BrowserRouter>
      <QueryClientProvider client={client}>{ui}</QueryClientProvider>
    </BrowserRouter>
  );
};

describe("Candidates Page", () => {
  it("should show loading state", () => {
    renderWithProviders(<Candidates />);
    expect(screen.getByText(/Chargement des candidats/i)).toBeInTheDocument();
  });

  it("should display empty state when no candidates", async () => {
    server.use(
      http.get("*/api/candidates", () => HttpResponse.json([]))
    );
    renderWithProviders(<Candidates />);
    expect(await screen.findByText(/Aucun candidat pour l'instant/i)).toBeInTheDocument();
  });


  it("should show error message when deletion fails", async () => {
    server.use(
      http.delete("*/api/candidates/:id", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<Candidates />);
    
    const deleteBtn = await screen.findByRole("button", { name: /Supprimer/i });
    fireEvent.click(deleteBtn);

    expect(await screen.findByText(/Erreur/i)).toBeInTheDocument();
  });
});
