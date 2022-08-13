import { render, screen } from "@testing-library/react";
import MovieSearch from "./MovieSearch";

test("title contains Movie Search Engine", () => {
  render(<MovieSearch />);
  const titleText = screen.getByText(/Movie Search Engine/i);
  expect(titleText).toBeInTheDocument();
});
