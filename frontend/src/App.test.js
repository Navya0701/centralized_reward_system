import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders welcome message", () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to Creator Platform/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders Get Started button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Get Started/i);
  expect(buttonElement).toBeInTheDocument();
});
