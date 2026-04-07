import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

test("login works", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const button = screen.getByRole("button", { name: /login/i });

  fireEvent.click(button);

  expect(await screen.findByText("Login")).toBeInTheDocument();
});