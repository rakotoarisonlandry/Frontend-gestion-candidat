import { render, screen } from "@testing-library/react";
import Candidates from "./Candidates";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("should display candidates", async () => {
  const client = new QueryClient();

  render(
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Candidates />
      </QueryClientProvider>
    </BrowserRouter>
  );

  expect(await screen.findByText("Landry")).toBeInTheDocument();
});