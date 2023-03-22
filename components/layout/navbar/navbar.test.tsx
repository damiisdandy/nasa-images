import { render, screen } from "@testing-library/react";
import Navbar from ".";

test("Ensure <Navbar/> loads correctly", () => {
  render(<Navbar />);

  const heading = screen.getByRole("heading", {
    name: /Nasa Gallery/i,
  });

  expect(heading).toBeInTheDocument();
});
